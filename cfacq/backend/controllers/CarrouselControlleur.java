package sitecfacq.web.controllers;

import ca.attsoft.web.framework.annotations.*;
import ca.attsoft.web.framework.stateful.WebContext;
import org.apache.commons.fileupload.FileItem;
import sitecfacq.domaine.Bureau;
import sitecfacq.domaine.common.Fichier;
import sitecfacq.domaine.common.FichierWithImage;
import sitecfacq.services.BureauService;
import sitecfacq.services.CarrouselService;
import sitecfacq.services.FileService;
import sitecfacq.web.interceptors.HistoryInterceptor;
import sitecfacq.web.interceptors.ValidationInterceptor;

import javax.ejb.Lock;
import javax.inject.Inject;
import javax.interceptor.Interceptors;
import javax.transaction.Transactional;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Interceptors({ValidationInterceptor.class, HistoryInterceptor.class})
@Public
public class CarrouselControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  @Inject
  private CarrouselService service;
  @Inject
  private FileService fileService;

  @Json
  @Transactional
  public Boolean save() {
    FileItem fi = getContext().getFileItem();
    if (fi == null || fi.getName() == null || (!fi.getName().substring(fi.getName().length() - 4).equalsIgnoreCase(".jpg")
      && !fi.getName().substring(fi.getName().length() - 4).equalsIgnoreCase(".png") && !fi.getName().substring(fi.getName().length() - 4).equalsIgnoreCase(".pdf") && !fi.getName().substring(fi.getName().length() - 5).equalsIgnoreCase(".jpeg"))) {
      getContext().addError("Le fichier passé en paramêtre est erroné ou l'extension du fichier n'est pas supporté. Assurez-vous que le fichier à bien été saisi et que l'extension de celui-ci est soit JPG, JPEG, PNG.");
      return null;
    }
    Fichier facture = new Fichier();
    facture.setNom(fi.getName().replace(":", "_"));
    facture.setFileImage(fi.get());
    facture.setCarrousel(true);

    try {
      facture = service.save(facture);
    } catch (Exception ex) {
      getContext().addError("Erreur lors de la sauvegarde de l'image");
      Logger.getLogger(CarrouselControlleur.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
      return null;
    }

    return true;
  }

  @Json
  @Public
  public List<Fichier> getAll() {
    return service.getAll();
  }

  @Json
  @Public
  public List<FichierWithImage> getAllWithImage() {
    List<FichierWithImage> t = new ArrayList<>();
    List<Fichier> fichiers = service.getAll();

    for (Fichier f : fichiers) {
      FichierWithImage fi = new FichierWithImage();
      byte[] image = fileService.getFilePayload(f.getId(), f.getNom());
      if(image != null) {
        try {
          fi.setFileImage(new String(org.apache.commons.codec.binary.Base64.encodeBase64(image), "UTF-8"));
        } catch (UnsupportedEncodingException e) {
          e.printStackTrace();
        }
      }
      fi.setNom(f.getNom());
      t.add(fi);
    }

    return t;
  }

  @File
  @Public
  public String show(@Name("id") Long id) {
    if (id == null) {
      getContext().addError("Aucun id n'a été fourni");
      return null;
    }

    Fichier facture = service.getById(id);

    if (facture != null) {
      try {
        WebContext.setFilePayload(new ByteArrayOutputStream());
        getContext().setFileIsAttachment(false);
        getContext().setFileMimeType(File.JPEG);
        DataOutputStream w = new DataOutputStream(WebContext.getFilePayload());
        byte[] image = fileService.getFilePayload(facture.getId(), facture.getNom());
        if (image != null) {
          w.write(Base64.getEncoder().encode(image));
        } else {
          w.writeBytes("null");
        }
        w.flush();
        w.close();
        return facture.getNom();
      } catch (IOException ex) {
        getContext().addError("Erreur lors de la récupération de l'image");
        Logger.getLogger(CarrouselControlleur.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
        return null;
      }
    } else {
      getContext().addError("Erreur lors de la récupération de l'image");
      return null;
    }
  }

  @Json
  @Transactional
  public Boolean supprimer(@Name("id") Long id) {
    Fichier image = service.getById(id);
    if (image == null) {
      getContext().addError("Erreur lors de la récupération de l'image");
    }

    try {
      service.delete(image);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la suppression de l'image");
      Logger.getLogger(CarrouselControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    return true;
  }

}
