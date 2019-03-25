package sitecfacq.services;

import sitecfacq.domaine.FichierAccueillirStagiaire;
import sitecfacq.domaine.common.Fichier;
import sitecfacq.services.common.GescoService;

import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

public class FichierAccueillirStagiaireService extends GescoService {

  public boolean hasOne() {
    TypedQuery<FichierAccueillirStagiaire> query = (em().createQuery("SELECT e FROM FichierAccueillirStagiaire e WHERE e.deleted is null", FichierAccueillirStagiaire.class));
    List<FichierAccueillirStagiaire> list = query.getResultList();
    if(list != null && list.size() > 0) {
      return true;
    }
    return false;
  }
  public FichierAccueillirStagiaire get() {
    TypedQuery<FichierAccueillirStagiaire> query = (em().createQuery("SELECT e FROM FichierAccueillirStagiaire e WHERE e.deleted is null", FichierAccueillirStagiaire.class));

    List<FichierAccueillirStagiaire> list = query.getResultList();
    if(list != null && list.size() > 0) {
      return list.get(0);
    }
    return null;
  }


  @Transactional
  public FichierAccueillirStagiaire save(FichierAccueillirStagiaire fic) {
    if (fic.getId() == null) {
      em().persist(fic);
    } else {
      fic = em().merge(fic);
    }
    return fic;
  }


  @Transactional
  public FichierAccueillirStagiaire delete(FichierAccueillirStagiaire e) {
    if(e != null) {
      e.setDeleted(new Date());
      e.getFichier().setDeleted(new Date());
      e = em().merge(e);
    }
    return e;
  }

}
