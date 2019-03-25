package sitecfacq.web.controllers;

import ca.attsoft.web.framework.annotations.File;
import ca.attsoft.web.framework.annotations.Json;
import ca.attsoft.web.framework.annotations.Name;
import ca.attsoft.web.framework.annotations.Public;
import ca.attsoft.web.framework.stateful.WebContext;
import org.apache.commons.fileupload.FileItem;
import sitecfacq.domaine.*;
import sitecfacq.domaine.common.Fichier;
import sitecfacq.domaine.common.Utilisateur;
import sitecfacq.services.*;
import sitecfacq.web.interceptors.HistoryInterceptor;
import sitecfacq.web.interceptors.ValidationInterceptor;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import javax.transaction.Transactional;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Interceptors({ValidationInterceptor.class, HistoryInterceptor.class})
@Public
public class CvControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  @Inject
  private CvService service;

  @Inject
  private CarrouselService serviceCarrousel;
  @Inject
  private UserService serviceUser;
  @Inject
  private MailService mailService;
  @Inject
  private FileService fileService;

  @Json
  @Public
  @Transactional
  public Boolean save(@Name("json") Cv cv) {
    if (cv == null) {
      getContext().addError("Erreur lors de la sauvegarde du cv");
      return false;
    }

    boolean isNewUser = cv.getId() == null;

    try {
      cv.setDate(new Date());
      service.save(cv);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la sauvegarde du cv");
      Logger.getLogger(CvControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    if(isNewUser){
      sendEmail();
    }

    return true;
  }

  @Json
  @Public
  @Transactional
  public Boolean post() {
    FileItem fi = getContext().getFileItem();
    if (fi != null) {
      if (fi.getName() == null || (!fi.getName().substring(fi.getName().length() - 4).equalsIgnoreCase(".pdf"))) {
        getContext().addError("Le fichier passé en paramêtre est erroné ou l'extension du fichier n'est pas supporté. Assurez-vous que le fichier à bien été saisi et que l'extension de celui-ci est soit PDF.");
        return null;
      }
      Fichier image = new Fichier();
      image.setNom(fi.getName().replace(":", "_"));
      image.setFileImage(fi.get());

      CvFichier cvFichier = new CvFichier();
      cvFichier.setFichier(image);

      try {
        cvFichier.setDate(new Date());
        service.save(cvFichier);
      } catch (Exception e) {
        getContext().addError("Erreur lors de l'envoi du cv.");
        Logger.getLogger(CvControlleur.class.toString()).log(Level.SEVERE, null, e);
        return false;
      }
    } else {
      getContext().addError("Erreur lors de l'envoi du cv.");
      return false;
    }

    sendEmail();

    return true;
  }

  private void sendEmail(){
    String subject = "Nouveau CV";
    String message = "Un étudiant vient de transmettre un nouveau CV sur le site du CFACQ. Vous pouvez allez consulter les informations dans la partie admin du site du cfacq ou en suivant ce lien: <a href=\"http://localhost:4200/admin/cv\">http://localhost:4200/admin/cv</a>";

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
  public List<Cv> getAll() {
    return service.getAll();
  }

  @Json
  @Public
  public List<Cv> getAllPublished() {
    return service.getAllPublished();
  }

  @Json
  @Public
  public List<CvFichier> getAllCVFichier() {
    return service.getAllCVFichier();
  }

  @Json
  @Public
  public List<Cv> filterCV(@Name("city") ListCity city, @Name("typePost") ListTypePost typePost, @Name("categoryPost") ListCategoryPost categoryPost) {
    if ((city != null && city.getVilles() != null && city.getVilles().size() > 0) ||
      (typePost != null && typePost.getTypePostes() != null && typePost.getTypePostes().size() > 0) ||
      (categoryPost != null && categoryPost.getCategoriePostes() != null && categoryPost.getCategoriePostes().size() > 0)) {
      return service.filterCV(city.getVilles(), typePost.getTypePostes(), categoryPost.getCategoriePostes());
    } else {
      return service.getAll();
    }
  }

  @Json
  @Public
  public Cv getCvById(@Name("id") Long id) {
    return service.getById(id);
  }


  @Json
  @Transactional
  public Boolean supprimer(@Name("id") Long id) {
    Cv cv = service.getById(id);
    if (cv == null) {
      getContext().addError("Erreur lors de la récupération du cv");
    }

    try {
      service.delete(cv);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la suppression du cv");
      Logger.getLogger(CvControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    return true;
  }

  @Json
  @Transactional
  public Boolean supprimerFichier(@Name("id") Long id) {
    CvFichier cv = service.getFichierById(id);
    if (cv == null) {
      getContext().addError("Erreur lors de la récupération du cv");
    }

    try {
      service.deleteFichier(cv);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la suppression du cv");
      Logger.getLogger(CvControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    return true;
  }

  @Json
  @Transactional
  public Boolean togglePublished(@Name("id") Long id) {
    Cv cv = service.getById(id);
    if (cv == null) {
      getContext().addError("Erreur lors de la récupération du cv");
    }

    try {
      cv.setPublished(!cv.isPublished());
      service.save(cv);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la publication du cv");
      Logger.getLogger(CvControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    return true;
  }

  @File
  @Public
  public String show(@Name("id") Long id) {
    if (id == null) {
      getContext().addError("Aucun id n'a été fourni");
      return null;
    }

    Fichier fichier = serviceCarrousel.getById(id);

    if (fichier != null) {
      try {
        WebContext.setFilePayload(new ByteArrayOutputStream());
        getContext().setFileIsAttachment(false);
        getContext().setFileMimeType(File.PDF);
        DataOutputStream w = new DataOutputStream(getContext().getFilePayload());
        byte[] image = fileService.getFilePayload(fichier.getId(), fichier.getNom());
        w.write(image);
        w.flush();
        w.close();
        return fichier.getNom();
      } catch (IOException ex) {
        getContext().addError("Erreur lors de la récupération du pdf");
        Logger.getLogger(CarrouselControlleur.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
        return null;
      }
    } else {
      getContext().addError("Erreur lors de la récupération du pdf");
      return null;
    }
  }
}
