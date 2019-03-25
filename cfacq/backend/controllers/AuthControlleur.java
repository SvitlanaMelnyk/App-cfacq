/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package sitecfacq.web.controllers;

import ca.attsoft.web.framework.annotations.API;
import ca.attsoft.web.framework.annotations.Json;
import ca.attsoft.web.framework.annotations.Name;
import ca.attsoft.web.framework.annotations.Public;
import ca.attsoft.web.framework.services.SecretService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.TextCodec;
import sitecfacq.domaine.common.Permission;
import sitecfacq.domaine.common.Role;
import sitecfacq.domaine.common.Utilisateur;
import sitecfacq.services.EmployeService;
import sitecfacq.services.PermissionsService;
import sitecfacq.services.UserService;

import javax.inject.Inject;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * @author andre
 */
@Public
public class AuthControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  @Inject
  private UserService service;
  @Inject
  private PermissionsService servicePermission;
  @Inject
  private EmployeService serviceEmp;
  @Inject
  private SecretService secretService;

  public void createDefaultUser() {
    try {
      //ajouter la liste des permissions requises et faire un check dans la bd pour chaque et les ajouter si pas présente dans la bd
      List<Permission> permissions = new ArrayList<Permission>();

      for (int i = 0; i < permissions.size(); i++) {
        Permission permission = servicePermission.findPermission(permissions.get(i).getPermissionStr());
        if (permission == null) {
          permission = new Permission();
          permission.setPermissionStr(permissions.get(i).getPermissionStr());
          permission.setRestricted(permissions.get(i).isRestricted());
          permissions.set(i, servicePermission.savePermission(permission));
        } else {
          permissions.set(i, permission);
        }
      }

      //Créer le role attsoft si pas créé
      Role role = servicePermission.findRole("attsoft");
      if (role == null) {
        role = new Role();
        role.setNom("attsoft");
        role.setRestricted(true);
        role.setPermissions(servicePermission.getAllPermissionsIncludingRestricted());
        servicePermission.saveRole(role);
      } else {
        role.setPermissions(servicePermission.getAllPermissionsIncludingRestricted());
        servicePermission.saveRole(role);
      }

      createDefaultRoles(permissions);

      //Créer l'utilisateur etcsoft si pas créé
      Utilisateur user = service.find("etcsoft");
      if (user == null) {
        user = new Utilisateur();
        user.setNom("Attsoft");
        user.setPrenom("Support");
        user.setUsername("etcsoft");
        user.setRole(role);
        user.setRestricted(true);
        service.save(user, "software");
      }
    } catch (Exception e) {
      Logger.getLogger(AuthControlleur.class.getName()).log(Level.SEVERE, e.getMessage(), e);
    }
  }

  private void createDefaultRoles(List<Permission> p) {
    Role role = servicePermission.findRole("Administrateur");
    if (role == null) {
      role = new Role();
      role.setNom("Administrateur");
      role.setRestricted(false);
      servicePermission.saveRole(role);
    }

    role = servicePermission.findRole("Employeur");
    if (role == null) {
      role = new Role();
      role.setNom("Employeur");
      role.setRestricted(false);
      servicePermission.saveRole(role);
    }
  }

  @Json
  @API
  @Public
  public Utilisateur login(@Name("username") String username, @Name("password") String password) {
    Utilisateur user = service.find(username);
    if (user != null) {
      byte[] pass = service.hashPassword(password.toCharArray(), user.getSalt().getBytes(), user.getIteration(), 256);
      if (Arrays.equals(user.getHash(), pass)) {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.MONTH, 1);
        String jws = Jwts.builder()
          .setIssuer("SiteCfacq")
          .setSubject(user.getPrenom().charAt(0) + user.getNom())
          .claim("name", user.getPrenom() + " " + user.getNom())
          .claim("scope", "admin")
          .claim("username", user.getUsername())
          .setIssuedAt(new Date())
          .setExpiration(c.getTime())
          .signWith(
            SignatureAlgorithm.HS256,
            secretService.getHS256SecretBytes()
          )
          .compact();
        user.setToken(jws);
      }
    }
    return user;
  }

  @Json
  @Public
  public Utilisateur loginExt(@Name("i") String i) {
    Utilisateur user = service.findByToken(i);
    if(user == null) {
      getContext().addError("Erreur lors de la récupération des informations");
      return null;
    }
    return user;
  }

  public void logout() {
    getContext().setUser(null);
    getContext().setRedirect(true);
    getContext().setRedirectPath("login");
  }

  @Json
  public boolean conn() {
    return true;
  }
}
