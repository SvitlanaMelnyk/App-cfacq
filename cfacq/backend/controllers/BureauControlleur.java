package sitecfacq.web.controllers;

import ca.attsoft.web.framework.annotations.Json;
import ca.attsoft.web.framework.annotations.Name;
import ca.attsoft.web.framework.annotations.Public;
import com.google.code.geocoder.model.*;
import com.google.maps.*;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.PlacesSearchResponse;
import sitecfacq.domaine.*;
import sitecfacq.domaine.common.Adresse;
import sitecfacq.services.BureauService;
import sitecfacq.services.LocalService;
import sitecfacq.services.PosteService;
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
public class BureauControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  @Inject
  private BureauService service;
  @Inject
  private LocalService serviceLocal;
  @Inject
  private PosteService servicePoste;

  @Json
  @Transactional
  public Boolean save(@Name("json") Bureau bureau) {
    if (bureau == null) {
      getContext().addError("Erreur lors de la sauvegarde du bureau");
      return false;
    }

    LatLng g = getLatLng(bureau.getAdresse());
    if (g != null) {
      bureau.getAdresse().setLat(g.getLat());
      bureau.getAdresse().setLng(g.getLng());
    }

    try {
      service.save(bureau);
    } catch (Exception e) {
      getContext().addError("bad sad");
      Logger.getLogger(BureauControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    //todo: send email

    return true;
  }

  private LatLng getLatLng(Adresse adresse) {
    try {
      GeoApiContext context = new GeoApiContext.Builder().apiKey("AIzaSyB4p23uAO65E9HTE-jcgQjEI9AzqoB5-84").build();
      PlacesSearchResponse results = PlacesApi.textSearchQuery(context, adresse.toString()).await();
      if (results.results.length > 0) {
        GeocodingResult[] geoRes = GeocodingApi.geocode(context, results.results[0].formattedAddress).await();
        if (geoRes.length != 0) {
          return new LatLng(new BigDecimal(geoRes[0].geometry.location.lat), new BigDecimal(geoRes[0].geometry.location.lng));
        }
        return null;
      }
      return null;
    } catch (Exception e) {
      getContext().addError("Erreur lors de la sauvegarde des LatLon");
    }

    return null;
  }

  @Json
  @Public
  public List<Bureau> getAll() {
    List<Bureau> l = service.getAll();
    for (Bureau b : l) {
      b.setLocaux(serviceLocal.getAllByBureau(b));
      b.setPostes(servicePoste.getAllByBureau(b));
    }

    return l;
  }

  @Json
  @Transactional
  public Boolean supprimer(@Name("id") Long id) {
    Bureau bureau = service.getById(id);
    if (bureau == null) {
      getContext().addError("Erreur lors de la récupération du bureau");
    }

    try {
      service.delete(bureau);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la suppression du bureau");
      Logger.getLogger(CvControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    return true;
  }

}
