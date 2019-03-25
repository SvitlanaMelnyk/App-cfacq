package sitecfacq.services;

import sitecfacq.domaine.Media;
import sitecfacq.domaine.common.Fichier;
import sitecfacq.services.common.GescoService;

import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

public class MediaService extends GescoService {


  public List<Media> getAllMedia() {

    Query query = em().createQuery("SELECT m FROM Media m " +
      "where m.deleted is null " +
      "ORDER BY m.date DESC");


    List<Media> list = (List<Media>) query.getResultList();
    return list;
  }

  public List<Media> getThreeLastMedia() {

    Query query = em().createQuery("SELECT m FROM Media m " +
      "where m.deleted is null ORDER BY m.date DESC");


    List<Media> list = (List<Media>) query.setMaxResults(3).getResultList();

    return list;
  }

  public Media getById(Long id) {
    if (id == null) {
      return null;
    }
    return em().find(Media.class, id);
  }

  @Transactional
  public Media save(Media e) {
    if (e.getId() != null) {
      e = em().merge(e);
    } else {
      em().persist(e);
    }
    return e;
  }

  @Transactional
  public Media delete(Media e) {
    e.setDeleted(new Date());
    e = em().merge(e);
    return e;
  }
}
