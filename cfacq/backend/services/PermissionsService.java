/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package sitecfacq.services;

import ca.attsoft.web.framework.interfaces.IValidator;
import ca.attsoft.web.framework.stateful.IUser;
import sitecfacq.domaine.common.Permission;
import sitecfacq.domaine.common.Role;
import sitecfacq.domaine.common.Utilisateur;
import sitecfacq.services.common.GescoService;

import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * @author andre
 */
public class PermissionsService extends GescoService implements IValidator<Role> {

  public Role findRole(Long idRole) {
    return em().find(Role.class, idRole);
  }

  public Role findRole(String nom) {
    Query query = em().createQuery("SELECT u FROM Role u WHERE UPPER(u.nom) = UPPER(:nom) and u.deleted is null");
    query.setParameter("nom", nom);
    try {
      List<Role> results = new ArrayList<>();
      results.addAll(query.getResultList());
      return results.get(0);
    } catch (Exception ex) {
      Logger.getLogger(PermissionsService.class.toString()).log(Level.SEVERE, ex.getMessage(), ex);
    }
    return null;
  }

  public Permission findPermission(String nom) {
    Query query = em().createQuery("SELECT p FROM Permission p WHERE UPPER(p.permissionStr) = UPPER(:nom) and p.deleted is null");
    query.setParameter("nom", nom);
    try {
      List<Permission> results = new ArrayList<>();
      results.addAll(query.getResultList());
      if (results.size() > 0) {
        return results.get(0);
      }
    } catch (Exception ex) {
      Logger.getLogger(PermissionsService.class.toString()).log(Level.SEVERE, ex.getMessage(), ex);
    }
    return null;
  }

  public List<Permission> getUserPermissions(IUser user) {
    Query query = em().createQuery("SELECT u.role FROM Utilisateur u WHERE u.id = :userId and u.deleted is null");
    query.setParameter("userId", user.getId());

    Role r;
    try {
      List<Role> results = new ArrayList<>();
      results.addAll(query.getResultList());
      if (results.size() == 0) {
        return null;
      }
      return results.get(0).getPermissions();
    } catch (Exception e) {
      Logger.getLogger(PermissionsService.class.getName()).log(Level.SEVERE, e.getMessage(), e);
    }
    return null;
  }

  public Integer getNbUserWithRole(Role role) {
    Query query = em().createQuery("SELECT u FROM Utilisateur u WHERE u.role = :role and u.deleted is null");
    query.setParameter("role", role);
    List<Utilisateur> l = (List<Utilisateur>) query.getResultList();
    return l.size();
  }

  public List<Role> getAllRoles() {
    Query query = em().createQuery("SELECT r FROM Role r where r.deleted is null AND r.restricted = false ORDER BY r.nom");
    return (List<Role>) query.getResultList();
  }

  public List<Permission> getAllPermissions() {
    Query query = em().createQuery("SELECT p FROM Permission p where p.deleted is null AND p.restricted = false ORDER BY p.permissionStr");
    return (List<Permission>) query.getResultList();
  }

  public List<Permission> getAllPermissionsIncludingRestricted() {
    Query query = em().createQuery("SELECT p FROM Permission p where p.deleted is null ORDER BY p.permissionStr");
    return (List<Permission>) query.getResultList();
  }

  public boolean isRoleUsed(Long idRole) {
    boolean used = false;

    Query query = em().createQuery("SELECT u FROM Utilisateur u where u.deleted is null AND u.role.id = :id");
    query.setParameter("id", idRole);
    List<Utilisateur> u = (List<Utilisateur>) query.getResultList();

    if (u.size() > 0) {
      used = true;
    }

    return used;
  }

  @Transactional
  public Role saveRole(Role role) {
    if (role.getId() != null) {
      role = em().merge(role);
    } else {
      em().persist(role);
    }
    return role;
  }

  @Transactional
  public Permission savePermission(Permission permission) {
    if (permission.getId() != null) {
      permission = em().merge(permission);
    } else {
      em().persist(permission);
    }
    return permission;
  }

  @Transactional
  public void deleteRole(Role role) {
    role.setDeleted(new Date());
    em().merge(role);
  }

  @Override
  public boolean validate(Role role) {

    return true;
  }
}
