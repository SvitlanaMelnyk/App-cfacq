package sitecfacq.services;

import sitecfacq.domaine.Bureau;
import sitecfacq.domaine.common.Fichier;
import sitecfacq.services.common.GescoService;

import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

public class CarrouselService extends GescoService {

  public Fichier getById(Long id) {
    if (id == null) {
      return null;
    }
    return em().find(Fichier.class, id);
  }

  public List<Fichier> getAll() {
    TypedQuery<Fichier> query = (em().createQuery("SELECT e FROM Fichier e WHERE e.carrousel = true and e.deleted is null", Fichier.class));

    List<Fichier> list = query.getResultList();

    return list;
  }

  @Transactional
  public Fichier save(Fichier e) {
    if (e.getId() != null) {
      e = em().merge(e);
    } else {
      em().persist(e);
    }
    return e;
  }


  @Transactional
  public Fichier delete(Fichier e) {
    e.setDeleted(new Date());
    e = em().merge(e);
    return e;
  }

}
