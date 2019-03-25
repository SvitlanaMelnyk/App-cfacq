package sitecfacq.web.controllers;

import ca.attsoft.web.framework.annotations.File;
import ca.attsoft.web.framework.annotations.Json;
import ca.attsoft.web.framework.annotations.Name;
import ca.attsoft.web.framework.annotations.Public;
import ca.attsoft.web.framework.stateful.WebContext;
import org.apache.commons.fileupload.FileItem;
import sitecfacq.domaine.Actualite;
import sitecfacq.domaine.common.Fichier;
import sitecfacq.services.CarrouselService;
import sitecfacq.services.FileService;
import sitecfacq.services.NewsService;
import sitecfacq.web.interceptors.HistoryInterceptor;
import sitecfacq.web.interceptors.ValidationInterceptor;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import javax.transaction.Transactional;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Interceptors({ValidationInterceptor.class, HistoryInterceptor.class})
@Public
public class ActualiteControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  @Inject
  private NewsService service;
  @Inject
  private CarrouselService serviceCarrousel;
  @Inject
  private FileService fileService;

  @Json
  @Public
  public List<Actualite> getAll() {
    return service.getAll();
  }


  @Json
  @Public
  public List<Actualite> getThreeLast() {
    return service.getThreeLast();
  }


  @Json
  @Public
  public List<Actualite> getNewsByCategory(@Name("category") String category) {
    return service.getByCategory(category);
  }

  @Json
  @Public
  public Actualite getById(@Name("id") Long id) {
    return service.getById(id);
  }

  @Json
  @Transactional
  public Boolean delete(@Name("id") Long id) {
    Actualite news = service.getById(id);
    if (news == null) {
      getContext().addError("Erreur lors de la récupération de la nouvelle");
      return false;
    }

    try {
      service.delete(news);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la suppression de la nouvelle");
      Logger.getLogger(ActualiteControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    return true;
  }

  @Json
  @Transactional
  public Boolean save(@Name("json") Actualite news) {
    if (news == null) {
      getContext().addError("Erreur lors de la sauvegarde de la nouvelle");
      return false;
    }


    List<FileItem> fi = getContext().getFileItems();
    if (fi != null) {
      for (FileItem f : fi) {
        if (f == null || f.getName() == null || (!f.getName().substring(f.getName().length() - 4).equalsIgnoreCase(".jpg")
          && !f.getName().substring(f.getName().length() - 4).equalsIgnoreCase(".png") && !f.getName().substring(f.getName().length() - 4).equalsIgnoreCase(".pdf") && !f.getName().substring(f.getName().length() - 5).equalsIgnoreCase(".jpeg"))) {
          getContext().addError("Le fichier passé en paramêtre est erroné ou l'extension du fichier n'est pas supporté. Assurez-vous que le fichier à bien été saisi et que l'extension de celui-ci est soit JPG, JPEG, PNG.");
          return null;
        }
      }
    }

    int i = 0;
    for (Fichier f : news.getImages()) {
      if (f.getId() == null) {
        f.setNom(fi.get(i).getName().replace(":", "_"));
        f.setFileImage(fi.get(i).get());
        i++;
      }
    }

    try {
      service.save(news);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la sauvegarde de la nouvelle");
      Logger.getLogger(ActualiteControlleur.class.toString()).log(Level.SEVERE, null, e);
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

    Fichier facture = serviceCarrousel.getById(id);

    if (facture != null) {
      try {
        WebContext.setFilePayload(new ByteArrayOutputStream());
        getContext().setFileIsAttachment(false);
        getContext().setFileMimeType(File.JPEG);
        DataOutputStream w = new DataOutputStream(WebContext.getFilePayload());
        byte[] image = fileService.getFilePayload(facture.getId(), facture.getNom());
        if (image != null) {
          w.write(image);
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

}
