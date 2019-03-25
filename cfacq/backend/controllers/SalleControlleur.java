package sitecfacq.web.controllers;

import ca.attsoft.web.framework.annotations.Json;
import ca.attsoft.web.framework.annotations.Name;
import ca.attsoft.web.framework.annotations.Public;
import com.google.code.geocoder.model.LatLng;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.PlacesApi;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.PlacesSearchResponse;
import org.apache.commons.fileupload.FileItem;
import sitecfacq.domaine.Bureau;
import sitecfacq.domaine.Salle;
import sitecfacq.domaine.common.Adresse;
import sitecfacq.domaine.common.Fichier;
import sitecfacq.services.BureauService;
import sitecfacq.services.LocalService;
import sitecfacq.services.PosteService;
import sitecfacq.services.SalleService;
import sitecfacq.web.interceptors.HistoryInterceptor;
import sitecfacq.web.interceptors.ValidationInterceptor;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Interceptors({ValidationInterceptor.class, HistoryInterceptor.class})
@Public
public class SalleControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  @Inject
  private SalleService service;

  @Json
  @Transactional
  public Boolean save(@Name("json") Salle salle) {
    if (salle == null) {
      getContext().addError("Erreur lors de la sauvegarde de la salle");
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
    for (Fichier f : salle.getFichiers()) {
      if (f.getId() == null) {
        f.setNom(fi.get(i).getName().replace(":", "_"));
        f.setFileImage(fi.get(i).get());
        i++;
      }
    }

    try {
      service.save(salle);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la sauvegarde de la salle");
      Logger.getLogger(SalleControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    //todo: send email

    return true;
  }

  @Json
  @Public
  public List<Salle> getAll() {
    return service.getAll();
  }

  @Json
  @Transactional
  public Boolean supprimer(@Name("id") Long id) {
    Salle s = service.getById(id);
    if (s == null) {
      getContext().addError("Erreur lors de la récupération de la salle");
    }

    try {
      service.delete(s);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la suppression de la salle");
      Logger.getLogger(SalleControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    return true;
  }

}
