package sitecfacq.services;

import sitecfacq.domaine.Bureau;
import sitecfacq.domaine.Local;
import sitecfacq.domaine.Poste;
import sitecfacq.domaine.TypePoste;
import sitecfacq.services.common.GescoService;

import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

public class PosteService extends GescoService {

  public Poste getById(Long id) {
    if (id == null) {
      return null;
    }
    return em().find(Poste.class, id);
  }

  public List<Poste> getAll() {
    TypedQuery<Poste> query = (em().createQuery("SELECT e FROM Poste e WHERE e.deleted is null ORDER BY e.nom", Poste.class));

    List<Poste> list = query.getResultList();

    return list;
  }

  public List<Poste> getAllByBureau(Bureau bureau) {
    TypedQuery<Poste> query = (em().createQuery("SELECT e FROM Poste e WHERE e.bureau = :bureau and e.deleted is null ORDER BY e.nom", Poste.class));
    query.setParameter("bureau", bureau);

    List<Poste> list = query.getResultList();

    return list;
  }

  @Transactional
  public Poste save(Poste e) {
    if (e.getId() != null) {
      e = em().merge(e);
    } else {
      em().persist(e);
    }
    return e;
  }


  @Transactional
  public Poste delete(Poste e) {
    e.setDeleted(new Date());
    e = em().merge(e);
    return e;
  }

}
