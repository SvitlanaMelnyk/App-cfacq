package sitecfacq.services;

import sitecfacq.domaine.JobTitle;
import sitecfacq.services.common.GescoService;

import javax.persistence.Query;
import java.util.List;

public class JobTitleService extends GescoService {

  public List<JobTitle> getAllJobTitles() {

    Query query = em().createQuery("SELECT v FROM JobTitle v " +
      "where v.deleted is null " +
      "ORDER BY v.name");


    List<JobTitle> list = (List<JobTitle>) query.getResultList();
    return list;
  }

}
