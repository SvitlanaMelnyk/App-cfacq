package sitecfacq.services;

import sitecfacq.domaine.AboutUs;
import sitecfacq.domaine.common.Fichier;
import sitecfacq.services.common.GescoService;

import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

public class AboutUsService extends GescoService {

  public List<AboutUs> getAll() {
    Query query = em().createQuery("SELECT a FROM AboutUs a " +
      "where a.deleted is null " +
      "ORDER BY a.id");


    List<AboutUs> list = (List<AboutUs>) query.getResultList();
    return list;
  }

  @Transactional
  public AboutUs save(AboutUs aboutUs) {
    if (aboutUs.getId() == null) {
      em().persist(aboutUs);
    } else {
      aboutUs = em().merge(aboutUs);
    }
    return aboutUs;
  }

  @Transactional
  public AboutUs delete(AboutUs e) {
    e.setDeleted(new Date());
    e = em().merge(e);
    return e;
  }

  public AboutUs getById(Long id) {
    if (id == null) {
      return null;
    }
    return em().find(AboutUs.class, id);
  }
}
