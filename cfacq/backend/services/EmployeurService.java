package sitecfacq.services;

import sitecfacq.domaine.Employeur;
import sitecfacq.services.common.GescoService;

import javax.persistence.Query;
import java.util.List;

public class EmployeurService extends GescoService {

  public List<Employeur> getAllEmployeur() {

    Query query = em().createQuery("SELECT r FROM Employeur r " +
      "where r.deleted is null " +
      "ORDER BY r.nom");


    List<Employeur> list = (List<Employeur>) query.getResultList();
    return list;
  }

}
