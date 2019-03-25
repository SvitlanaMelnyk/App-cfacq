package sitecfacq.web.controllers;

import ca.attsoft.web.framework.annotations.Json;
import ca.attsoft.web.framework.annotations.Name;
import ca.attsoft.web.framework.annotations.Public;
import sitecfacq.domaine.*;
import sitecfacq.domaine.common.Utilisateur;
import sitecfacq.services.MailService;
import sitecfacq.services.RegistrationService;
import sitecfacq.services.UserService;
import sitecfacq.web.interceptors.HistoryInterceptor;
import sitecfacq.web.interceptors.ValidationInterceptor;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Interceptors({ValidationInterceptor.class, HistoryInterceptor.class})
@Public
public class RegistrationControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  @Inject
  private RegistrationService service;
  @Inject
  private UserService serviceUser;
  @Inject
  private MailService mailService;

  @Json
  @Public
  @Transactional
  public Boolean save(@Name("jsonRegistration") Registration registration) {
    if (registration == null) {
      getContext().addError("Erreur, aucune inscription à sauvegarder");
      return false;
    }

    boolean isNewUser = registration.getId() == null;

    try {
      registration.setDate(new Date());
      service.save(registration);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la sauvegarde de l'inscription");
      Logger.getLogger(RegistrationControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    if(isNewUser){
      sendEmail();
    }

    return true;
  }

  private void sendEmail(){
    String subject = "Nouvelle inscription à une formation";
    String message = "Un étdiant vient s'inscrire à une formation sur le site du CFACQ. Vous pouvez allez consulter les informations dans la partie admin du site du cfacq ou en suivant ce lien: <a href=\"http://localhost:4200/admin/inscriptions\">http://localhost:4200/admin/inscriptions</a>";

    List<Utilisateur> users = serviceUser.getAllAdmin();
    if(users.size() > 0) {
      List<String> emails = users.stream().filter(e -> e.getCourriel() != null).map(Utilisateur::getCourriel).collect(Collectors.toList());

      try {
        mailService.send(emails, subject, message, null);
      } catch (Exception e) {

      }
    }
  }

  @Json
  @Public
  public List<Registration> getAllRegistrations() {
    return service.getAllRegistrations();
  }

  @Json
  @Transactional
  public Boolean supprimer(@Name("id") Long id) {
    Registration registration = service.getById(id);
    if (registration == null) {
      getContext().addError("Erreur lors de la récupération de l'inscription");
      return false;
    }

    try {
      service.delete(registration);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la suppression de l'inscription");
      Logger.getLogger(CvControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    return true;
  }

  @Json
  @Transactional
  public Boolean toggleTraiter(@Name("id") Long id) {
    Registration registration = service.getById(id);
    if (registration == null) {
      getContext().addError("Erreur lors de la récupération de l'inscription");
      return false;
    }

    try {
      if(registration.getTraite() == null){
        registration.setTraite(false);
      }
      registration.setTraite(!registration.getTraite());
      service.save(registration);
    } catch (Exception e) {
      getContext().addError("Erreur lors du traitement de l'inscription");
      Logger.getLogger(CvControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    return true;
  }

}
