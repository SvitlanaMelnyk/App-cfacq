package sitecfacq.services;

import sitecfacq.domaine.*;
import sitecfacq.services.common.GescoService;

import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class CvService extends GescoService {

  @Transactional
  public Cv save(Cv cv) {

    if (cv.getId() == null) {
      em().persist(cv);
    } else {
      cv = em().merge(cv);
    }
    return cv;
  }

  @Transactional
  public CvFichier save(CvFichier cv) {

    if (cv.getId() == null) {
      em().persist(cv);
    } else {
      cv = em().merge(cv);
    }
    return cv;
  }

  @Transactional
  public Cv delete(Cv e) {
    e.setDeleted(new Date());
    e = em().merge(e);
    return e;
  }

  @Transactional
  public CvFichier deleteFichier(CvFichier e) {
    e.setDeleted(new Date());
    e = em().merge(e);
    return e;
  }

  public List<Cv> getAll() {

    Query query = em().createQuery("SELECT cv FROM Cv cv " +
      "where cv.deleted is null " +
      "ORDER BY cv.date DESC");


    List<Cv> list = (List<Cv>) query.getResultList();
    return list;
  }

  public List<Cv> getAllPublished() {

    Query query = em().createQuery("SELECT cv FROM Cv cv " +
      "where cv.published = true and cv.deleted is null " +
      "ORDER BY cv.date DESC");


    List<Cv> list = (List<Cv>) query.getResultList();
    return list;
  }

  public List<CvFichier> getAllCVFichier() {

    Query query = em().createQuery("SELECT cv FROM CvFichier cv " +
      "where cv.deleted is null " +
      "ORDER BY cv.date DESC");


    List<CvFichier> list = (List<CvFichier>) query.getResultList();
    return list;
  }

  public List<Cv> filterCV(List<Ville> city, List<TypePoste> typePost, List<CategoriePoste> categoryPost) {


    String q = "WHERE ";
    String joins = "";

    if (city != null && city.size() > 0) {
      q += "cv.city.id in :city and ";
    }

    if (typePost != null && typePost.size() > 0) {
      q += "tp.id in :typePost and ";
      joins += "JOIN cv.typePost tp ";
    }

    if (categoryPost != null && categoryPost.size() > 0) {
      q += "cp.id in :categoryPost and ";
      joins += "JOIN cv.categoryPost cp ";
    }

    String s = "SELECT DISTINCT cv FROM Cv cv " + joins + q + "cv.deleted is null";

    Query query = em().createQuery(s);


//    Query query = em().createQuery("SELECT DISTINCT cv FROM Cv cv JOIN cv.categoryPost cp JOIN cv.typePost tp WHERE cv.city.id in :city and cp.id in :categoryPost and tp.id in :typePost and cv.deleted is null");

    if (city != null && city.size() > 0) {
      query.setParameter("city", city.stream().map(e -> e.getId()).collect(Collectors.toList()));
    }

    if (typePost != null && typePost.size() > 0) {
      query.setParameter("typePost", typePost.stream().map(e -> e.getId()).collect(Collectors.toList()));
    }

    if (categoryPost != null && categoryPost.size() > 0) {
      query.setParameter("categoryPost", categoryPost.stream().map(e -> e.getId()).collect(Collectors.toList()));
    }

    List<Cv> list = (List<Cv>) query.getResultList();
    return list;
  }

  public Cv getById(Long id) {
    return em().find(Cv.class, id);
  }

  public CvFichier getFichierById(Long id) {
    return em().find(CvFichier.class, id);
  }
}
