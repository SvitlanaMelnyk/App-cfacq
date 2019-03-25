package sitecfacq.web.controllers;

import ca.attsoft.web.framework.annotations.File;
import ca.attsoft.web.framework.annotations.Json;
import ca.attsoft.web.framework.annotations.Name;
import ca.attsoft.web.framework.annotations.Public;
import ca.attsoft.web.framework.stateful.WebContext;
import org.apache.commons.fileupload.FileItem;
import sitecfacq.domaine.FichierAccueillirStagiaire;
import sitecfacq.domaine.Intern;
import sitecfacq.domaine.common.Fichier;
import sitecfacq.services.FichierAccueillirStagiaireService;
import sitecfacq.services.FileService;
import sitecfacq.services.InternService;
import sitecfacq.web.interceptors.HistoryInterceptor;
import sitecfacq.web.interceptors.ValidationInterceptor;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import javax.transaction.Transactional;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Interceptors({ValidationInterceptor.class, HistoryInterceptor.class})
@Public
public class InternControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  @Inject
  private InternService service;
  @Inject
  private FichierAccueillirStagiaireService serviceFichier;
  @Inject
  private FileService fileService;

  @Json
  @Public
  @Transactional
  public Boolean save(@Name("jsonInternForm") Intern intern) {
    if (intern == null) {
      getContext().addError("bad");
      return false;
    }

    try {
      intern.setDate(new Date());
      service.save(intern);
    } catch (Exception e) {
      getContext().addError("bad sad");
      Logger.getLogger(InternControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    //todo: send email

    return true;
  }


  @File
  @Public
  public String showFormulaire(@Name("attachment") Boolean attachment) {
    Fichier fichier = serviceFichier.get().getFichier();

    if (fichier != null) {
      try {
        WebContext.setFilePayload(new ByteArrayOutputStream());
        getContext().setFileIsAttachment(attachment);
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

  @Json
  @Transactional
  public Fichier saveFormulaireFichier() {
    FichierAccueillirStagiaire fichierAccueillirStagiaire;
    FileItem fi = getContext().getFileItem();
    if (fi != null) {
      if (fi.getName() == null || (!fi.getName().substring(fi.getName().length() - 4).equalsIgnoreCase(".pdf"))) {
        getContext().addError("Le fichier passé en paramêtre est erroné ou l'extension du fichier n'est pas supporté. Assurez-vous que le fichier à bien été saisi et que l'extension de celui-ci soit PDF.");
        return null;
      }
      Fichier image = new Fichier();
      image.setNom(fi.getName().replace(":", "_"));
      image.setFileImage(fi.get());

      fichierAccueillirStagiaire = new FichierAccueillirStagiaire();
      fichierAccueillirStagiaire.setFichier(image);

      try {
        serviceFichier.delete(serviceFichier.get());
        serviceFichier.save(fichierAccueillirStagiaire);
      } catch (Exception e) {
        getContext().addError("Erreur lors de l'envoi du cv.");
        Logger.getLogger(CvControlleur.class.toString()).log(Level.SEVERE, null, e);
        return null;
      }
    } else {
      getContext().addError("Erreur lors de l'envoi du cv.");
      return null;
    }

    return fichierAccueillirStagiaire.getFichier();
  }

  @Json
  @Transactional
  public Boolean deleteFormulaireFichier() {
    try {
      serviceFichier.delete(serviceFichier.get());
    } catch (Exception e) {
      getContext().addError("Erreur lors de l'envoi du cv.");
      Logger.getLogger(CvControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }
    return true;
  }

  @Json
  @Public
  public boolean hasFichierFormulaire() {
    return serviceFichier.hasOne();
  }

  @Json
  @Public
  public Fichier getFichierFormulaire() {
    FichierAccueillirStagiaire fichier = serviceFichier.get();
    if(fichier == null || fichier.getFichier() == null) {
      return null;
    }
    fichier.getFichier().setFileImage(null);
    return fichier.getFichier();
  }

  @Json
  @Public
  public List<Intern> getAllInterns() {
    return service.getAllInterns();
  }
}
