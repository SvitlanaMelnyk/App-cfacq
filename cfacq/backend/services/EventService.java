package sitecfacq.services;

import sitecfacq.domaine.Cv;
import sitecfacq.domaine.Event;
import sitecfacq.domaine.Ville;
import sitecfacq.services.common.GescoService;

import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

public class EventService extends GescoService {

  public List<Event> getAll(Date dateStart, Date dateEnd) {
    Query query = em().createQuery("SELECT e FROM Event e " +
      "where e.dateStart >= :dateStart and e.dateStart <= :dateEnd and e.deleted is null " +
      "ORDER BY e.dateStart");

    query.setParameter("dateStart", dateStart);
    query.setParameter("dateEnd", dateEnd);


    List<Event> list = (List<Event>) query.getResultList();
    return list;
  }

  public List<Event> getByCity(Date dateStart, Date dateEnd, Ville ville) {

    Query query = em().createQuery("SELECT e FROM Event e WHERE e.ville = :ville and e.dateStart >= :dateStart and e.dateStart <= :dateEnd and e.deleted is null");

    query.setParameter("ville", ville);
    query.setParameter("dateStart", dateStart);
    query.setParameter("dateEnd", dateEnd);

    List<Event> list = (List<Event>) query.getResultList();
    return list;
  }

  @Transactional
  public Event save(Event e) {

    if (e.getId() == null) {
      em().persist(e);
    } else {
      e = em().merge(e);
    }

    return e;
  }

  @Transactional
  public Event delete(Event e) {
    e.setDeleted(new Date());
    e = em().merge(e);
    return e;
  }

  public Event getById(Long id) {
    return em().find(Event.class, id);
  }

}
