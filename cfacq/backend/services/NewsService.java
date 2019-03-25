package sitecfacq.services;

import sitecfacq.domaine.Actualite;
import sitecfacq.domaine.Media;
import sitecfacq.services.common.GescoService;

import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

public class NewsService extends GescoService {

  public List<Actualite> getAll() {

    Query query = em().createQuery("SELECT n FROM Actualite n " +
      "where n.deleted is null " +
      "ORDER BY n.date DESC");


    List<Actualite> list = (List<Actualite>) query.getResultList();
    return list;
  }

  public List<Actualite> getThreeLast() {

    Query query = em().createQuery("SELECT n FROM Actualite n " +
      "where n.deleted is null ORDER BY n.date DESC");


    List<Actualite> list = (List<Actualite>) query.setMaxResults(3).getResultList();

    return list;
  }

  public List<Actualite> getByCategory(String category) {

    Query query = em().createQuery("SELECT n FROM Actualite n " +
      "where n.category = :category and n.deleted is null " +
      "ORDER BY n.id");

    query.setParameter("category", category);

    List<Actualite> list = (List<Actualite>) query.getResultList();
    return list;
  }

  @Transactional
  public Actualite save(Actualite e) {
    if (e.getId() != null) {
      e = em().merge(e);
    } else {
      em().persist(e);
    }
    return e;
  }

  @Transactional
  public Actualite delete(Actualite e) {
    e.setDeleted(new Date());
    e = em().merge(e);
    return e;
  }

  public Actualite getById(Long id) {
    return em().find(Actualite.class, id);
  }
}
