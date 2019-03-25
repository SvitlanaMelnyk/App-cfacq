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
import sitecfacq.domaine.Bureau;
import sitecfacq.domaine.Local;
import sitecfacq.domaine.common.Adresse;
import sitecfacq.services.BureauService;
import sitecfacq.services.LocalService;
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
public class LocalControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  @Inject
  private LocalService service;

  @Json
  @Transactional
  public Boolean save(@Name("json") Local local) {
    if (local == null) {
      getContext().addError("Erreur lors de la sauvegarde du local");
      return false;
    }

    try {
      service.save(local);
    } catch (Exception e) {
      getContext().addError("bad sad");
      Logger.getLogger(LocalControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    //todo: send email

    return true;
  }

  @Json
  @Public
  public List<Local> getAll() {
    return service.getAll();
  }

  @Json
  @Transactional
  public Boolean supprimer(@Name("id") Long id) {
    Local local = service.getById(id);
    if (local == null) {
      getContext().addError("Erreur lors de la récupération du local");
    }

    try {
      service.delete(local);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la suppression du local");
      Logger.getLogger(LocalControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    return true;
  }

}
