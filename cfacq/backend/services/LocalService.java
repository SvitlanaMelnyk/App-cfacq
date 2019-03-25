package sitecfacq.services;

import sitecfacq.domaine.Bureau;
import sitecfacq.domaine.Local;
import sitecfacq.services.common.GescoService;

import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

public class LocalService extends GescoService {

  public Local getById(Long id) {
    if (id == null) {
      return null;
    }
    return em().find(Local.class, id);
  }

  public List<Local> getAll() {
    TypedQuery<Local> query = (em().createQuery("SELECT e FROM Local e WHERE e.deleted is null ORDER BY e.nom", Local.class));

    List<Local> list = query.getResultList();

    return list;
  }

  public List<Local> getAllByBureau(Bureau bureau) {
    TypedQuery<Local> query = (em().createQuery("SELECT e FROM Local e WHERE e.bureau = :bureau and e.deleted is null ORDER BY e.nom", Local.class));
    query.setParameter("bureau", bureau);

    List<Local> list = query.getResultList();

    return list;
  }

  @Transactional
  public Local save(Local e) {
    if (e.getId() != null) {
      e = em().merge(e);
    } else {
      em().persist(e);
    }
    return e;
  }


  @Transactional
  public Local delete(Local e) {
    e.setDeleted(new Date());
    e = em().merge(e);
    return e;
  }

}
