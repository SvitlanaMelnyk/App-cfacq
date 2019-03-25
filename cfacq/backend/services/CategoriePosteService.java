package sitecfacq.services;

import sitecfacq.domaine.CategoriePoste;
import sitecfacq.services.common.GescoService;

import javax.persistence.Query;
import java.util.List;

public class CategoriePosteService extends GescoService {

  public List<CategoriePoste> getAllCategoriePoste() {

    Query query = em().createQuery("SELECT cp FROM CategoriePoste cp " +
      "where cp.deleted is null " +
      "ORDER BY cp.name");


    List<CategoriePoste> list = (List<CategoriePoste>) query.getResultList();
    return list;
  }

}
