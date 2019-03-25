package sitecfacq.services;

import sitecfacq.domaine.Bureau;
import sitecfacq.services.common.GescoService;

import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

public class BureauService extends GescoService {

  public Bureau getById(Long id) {
    if (id == null) {
      return null;
    }
    return em().find(Bureau.class, id);
  }

  public List<Bureau> getAll() {
    TypedQuery<Bureau> query = (em().createQuery("SELECT e FROM Bureau e WHERE e.deleted is null ORDER BY e.nom", Bureau.class));

    List<Bureau> list = query.getResultList();

    return list;
  }

  @Transactional
  public Bureau save(Bureau e) {
    if (e.getId() != null) {
      e = em().merge(e);
    } else {
      em().persist(e);
    }
    return e;
  }


  @Transactional
  public Bureau delete(Bureau e) {
    e.setDeleted(new Date());
    e = em().merge(e);
    return e;
  }

}
