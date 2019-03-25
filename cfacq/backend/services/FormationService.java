package sitecfacq.services;

import sitecfacq.domaine.Formation;
import sitecfacq.services.common.GescoService;

import javax.persistence.Query;
import java.util.List;

public class FormationService extends GescoService {

  public List<Formation> getAllFormation() {

    Query query = em().createQuery("SELECT f FROM Formation f " +
      "where f.deleted is null " +
      "ORDER BY f.name");


    List<Formation> list = (List<Formation>) query.getResultList();
    return list;
  }

}
