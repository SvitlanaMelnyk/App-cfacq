package sitecfacq.services;

import sitecfacq.domaine.*;
import sitecfacq.services.common.GescoService;

import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class RegistrationService extends GescoService {

  @Transactional
  public Registration save(Registration registration) {

    if (registration.getId() == null) {
      em().persist(registration);
    } else {
      registration = em().merge(registration);
    }
    return registration;
  }

  public List<Registration> getAllRegistrations() {

    Query query = em().createQuery("SELECT registration FROM Registration registration " +
      "where registration.deleted is null " +
      "ORDER BY registration.date DESC");


    List<Registration> list = (List<Registration>) query.getResultList();
    return list;
  }

  @Transactional
  public Registration delete(Registration e) {
    e.setDeleted(new Date());
    e = em().merge(e);
    return e;
  }

  public Registration getById(Long id) {
    return em().find(Registration.class, id);
  }


}
