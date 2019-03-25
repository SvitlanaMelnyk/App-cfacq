package sitecfacq.services;

import sitecfacq.domaine.TypePoste;
import sitecfacq.services.common.GescoService;

import javax.persistence.Query;
import java.util.List;

public class TypePosteService extends GescoService {

  public List<TypePoste> getAllTypePoste() {

    Query query = em().createQuery("SELECT tp FROM TypePoste tp " +
      "where tp.deleted is null " +
      "ORDER BY tp.name");


    List<TypePoste> list = (List<TypePoste>) query.getResultList();
    return list;
  }

}
