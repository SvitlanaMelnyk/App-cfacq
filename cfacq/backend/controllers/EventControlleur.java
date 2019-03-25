package sitecfacq.web.controllers;

import ca.attsoft.web.framework.annotations.Json;
import ca.attsoft.web.framework.annotations.Name;
import ca.attsoft.web.framework.annotations.Public;
import sitecfacq.domaine.Cv;
import sitecfacq.domaine.Event;
import sitecfacq.domaine.Offer;
import sitecfacq.domaine.Ville;
import sitecfacq.services.EventService;
import sitecfacq.web.interceptors.HistoryInterceptor;
import sitecfacq.web.interceptors.ValidationInterceptor;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Interceptors({ValidationInterceptor.class, HistoryInterceptor.class})
@Public
public class EventControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  @Inject
  private EventService service;

  @Json
  @Public
  public List<Event> getAll(@Name("dateStart") Date dateStart, @Name("dateEnd") Date dateEnd, @Name("city") Ville city) {
    if (city == null) {
      return service.getAll(dateStart, dateEnd);
    } else {
      return service.getByCity(dateStart, dateEnd, city);
    }
  }

  @Json
  @Transactional
  public Event save(@Name("json") Event event) {
    if (event == null) {
      getContext().addError("Erreur lors de la sauvegarde de l'événement");
      return null;
    }

    try {
      event = service.save(event);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la sauvegarde de l'événement");
      Logger.getLogger(CvControlleur.class.toString()).log(Level.SEVERE, null, e);
      return null;
    }

    return event;
  }


  @Json
  @Transactional
  public Boolean supprimer(@Name("id") Long id) {
    Event event = service.getById(id);
    if (event == null) {
      getContext().addError("Erreur lors de la récupération de l'événement");
    }

    try {
      service.delete(event);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la suppression de l'événement");
      Logger.getLogger(CvControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    return true;
  }


}
