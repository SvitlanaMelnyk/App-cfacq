package sitecfacq.web.controllers;

import ca.attsoft.web.framework.annotations.Json;
import ca.attsoft.web.framework.annotations.Name;
import ca.attsoft.web.framework.annotations.Public;
import org.apache.commons.fileupload.FileItem;
import sitecfacq.domaine.Media;
import sitecfacq.domaine.common.Fichier;
import sitecfacq.services.MediaService;
import sitecfacq.web.interceptors.HistoryInterceptor;
import sitecfacq.web.interceptors.ValidationInterceptor;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import javax.transaction.Transactional;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Interceptors({ValidationInterceptor.class, HistoryInterceptor.class})
@Public
public class MediaControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  @Inject
  private MediaService service;

  @Json
  @Transactional
  public Boolean save(@Name("json") Media media) {
    if (media == null) {
      getContext().addError("Erreur lors de la sauvegarde du média");
      return false;
    }

    FileItem fi = getContext().getFileItem();
    if (fi != null) {
      if (fi.getName() == null || (!fi.getName().substring(fi.getName().length() - 4).equalsIgnoreCase(".jpg")
        && !fi.getName().substring(fi.getName().length() - 4).equalsIgnoreCase(".png") && !fi.getName().substring(fi.getName().length() - 4).equalsIgnoreCase(".pdf") && !fi.getName().substring(fi.getName().length() - 5).equalsIgnoreCase(".jpeg"))) {
        getContext().addError("Le fichier passé en paramêtre est erroné ou l'extension du fichier n'est pas supporté. Assurez-vous que le fichier à bien été saisi et que l'extension de celui-ci est soit JPG, JPEG, PNG.");
        return null;
      }
      Fichier image = new Fichier();
      image.setNom(fi.getName().replace(":", "_"));
      image.setFileImage(fi.get());

      media.setImage(image);
    }

    try {
      service.save(media);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la sauvegarde du média");
      Logger.getLogger(MediaControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    return true;
  }

  @Json
  @Public
  public List<Media> getAllMedia() {
    return service.getAllMedia();
  }


  @Json
  @Public
  public List<Media> getThreeLastMedia() {
    return service.getThreeLastMedia();
  }

  @Json
  @Transactional
  public Boolean supprimer(@Name("id") Long id) {
    Media m = service.getById(id);
    if (m == null) {
      getContext().addError("Erreur lors de la récupération du média");
    }

    try {
      service.delete(m);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la suppression du média");
      Logger.getLogger(MediaControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    return true;
  }

}

