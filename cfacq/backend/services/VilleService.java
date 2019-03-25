package sitecfacq.services;

import sitecfacq.domaine.Ville;
import sitecfacq.services.common.GescoService;

import javax.persistence.Query;
import java.util.List;

public class VilleService extends GescoService {

  public List<Ville> getAll() {

    Query query = em().createQuery("SELECT v FROM Ville v " +
      "where v.deleted is null " +
      "ORDER BY v.name");


    List<Ville> list = (List<Ville>) query.getResultList();
    return list;
  }
}
