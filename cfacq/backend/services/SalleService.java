package sitecfacq.services;

import sitecfacq.domaine.Salle;
import sitecfacq.services.common.GescoService;

import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

public class SalleService extends GescoService {

  public Salle getById(Long id) {
    if (id == null) {
      return null;
    }
    return em().find(Salle.class, id);
  }

  public List<Salle> getAll() {
    TypedQuery<Salle> query = (em().createQuery("SELECT e FROM Salle e WHERE e.deleted is null ORDER BY e.nom", Salle.class));

    List<Salle> list = query.getResultList();

    return list;
  }

  @Transactional
  public Salle save(Salle e) {
    if (e.getId() != null) {
      e = em().merge(e);
    } else {
      em().persist(e);
    }
    return e;
  }


  @Transactional
  public Salle delete(Salle e) {
    e.setDeleted(new Date());
    e = em().merge(e);
    return e;
  }

}
