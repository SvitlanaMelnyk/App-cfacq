package sitecfacq.web.controllers;

import ca.attsoft.web.framework.annotations.Json;
import ca.attsoft.web.framework.annotations.Name;
import ca.attsoft.web.framework.annotations.Public;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.lang.RandomStringUtils;
import sitecfacq.domaine.Actualite;
import sitecfacq.domaine.Bureau;
import sitecfacq.domaine.Cour;
import sitecfacq.domaine.common.Fichier;
import sitecfacq.domaine.common.Utilisateur;
import sitecfacq.services.UserService;
import sitecfacq.web.interceptors.HistoryInterceptor;
import sitecfacq.web.interceptors.ValidationInterceptor;

import javax.crypto.SecretKey;
import javax.inject.Inject;
import javax.interceptor.Interceptors;
import javax.transaction.Transactional;
import java.nio.charset.Charset;
import java.util.List;
import java.util.Random;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Interceptors({ValidationInterceptor.class, HistoryInterceptor.class})
@Public
public class UtilisateurControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  @Inject
  private UserService service;

  @Json
  public List<Utilisateur> getAll() {
    List<Utilisateur> l = service.getAll();
    return l;
  }

  @Json
  @Transactional
  public Utilisateur create(@Name("json") Utilisateur user, @Name("password") String password) {
    if (user == null) {
      getContext().addError("Aucun utilisateur à sauvegarder");
      return null;
    }

    if (password == null || password.equals("")) {
      getContext().addError("Aucun mot de passe n'a été fourni");
      return null;
    }

    try {
      boolean isEmployeur = user.getRole().getNom().equalsIgnoreCase("Employeur");
      Utilisateur userTemp = null;
      if(!isEmployeur) {
        userTemp = service.find(user.getUsername());
      } else {
        user.setToken(RandomStringUtils.random(128, true, true));
      }

      if (userTemp == null || isEmployeur) {
        service.save(user, password);
      } else {
        getContext().addError("Un autre utilisateur existe déjà avec ce nom d'utilisateur. Veuillez en choisir un autre.");
        return null;
      }
    } catch (Exception e) {
      getContext().addError("Erreur lors de la création de l'utilisateur");
      Logger.getLogger(UtilisateurControlleur.class.toString()).log(Level.SEVERE, null, e);
      return null;
    }

    return user;
  }

  @Json
  @Transactional
  public Utilisateur changePassword(@Name("id") Long id, @Name("password") String password) {
    if (id == null) {
      getContext().addError("Aucun utilisateur à sauvegarder");
      return null;
    }

    if (password == null || password.equals("")) {
      getContext().addError("Aucun mot de passe n'a été fourni");
      return null;
    }

    Utilisateur user = service.getById(id);
    try {
      service.setPassword(user, password);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la modification du mot de passe de l'utilisateur");
      Logger.getLogger(UtilisateurControlleur.class.toString()).log(Level.SEVERE, null, e);
      return null;
    }

    return user;
  }

  @Json
  @Transactional
  public Boolean supprimer(@Name("id") Long id) {
    Utilisateur user = service.getById(id);
    if (user == null) {
      getContext().addError("Erreur lors de la récupération de l'utilisateur");
      return false;
    }

    try {
      service.delete(user);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la suppression de l'utilisateur");
      Logger.getLogger(UtilisateurControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    return true;
  }

  @Json
  @Transactional
  public Utilisateur save(@Name("json") Utilisateur user, @Name("password") String password) {
    if (user == null) {
      getContext().addError("Erreur lors de la sauvegarde de l'utilisateur");
      return null;
    }

    if(user.getId() != null){
      try {
        Utilisateur u = service.getById(user.getId());
        u.setNom(user.getNom());
        u.setPrenom(user.getPrenom());
        u.setCourriel(user.getCourriel());
        u.setRole(user.getRole());
        service.save(u);
      } catch (Exception e) {
        getContext().addError("Erreur lors de la sauvegarde de l'utilisateur");
        Logger.getLogger(UtilisateurControlleur.class.toString()).log(Level.SEVERE, null, e);
        return null;
      }
    }
    else{
      return create(user, password);
    }

    return user;
  }

  @Json
  public String getLink(@Name("id") Long id) {
    if (id == null) {
      getContext().addError("Erreur lors de la récupération du lien");
      return null;
    }

    Utilisateur u = service.getById(id);
    if(u == null) {
      getContext().addError("Erreur lors de la récupération du lien");
      return null;
    }

    return "http://localhost:4200?i=" + u.getToken();
  }

  @Json
  @Public
  public List<String> getContacts() {
    List<Utilisateur> u = service.getAllAdmin();
    if(u == null) {
      getContext().addError("Erreur lors de la récupération du lien");
      return null;
    }

    return u.stream().map(Utilisateur::getCourriel).collect(Collectors.toList());
  }
}


