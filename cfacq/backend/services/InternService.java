package sitecfacq.services;

import sitecfacq.domaine.Intern;
import sitecfacq.services.common.GescoService;

import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

public class InternService extends GescoService {

  @Transactional
  public Intern save(Intern intern) {

    if (intern.getId() == null) {
      em().persist(intern);
    } else {
      intern = em().merge(intern);
    }

    return intern;
  }

  public List<Intern> getAllInterns() {

    Query query = em().createQuery("SELECT intern FROM Intern intern " +
      "where intern.deleted is null " +
      "ORDER BY intern.date DESC");


    List<Intern> list = (List<Intern>) query.getResultList();
    return list;
  }

}
