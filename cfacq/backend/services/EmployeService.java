package sitecfacq.services;

import sitecfacq.domaine.*;
import sitecfacq.services.common.GescoService;

import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

public class EmployeService extends GescoService {

  public Employe find(Long id) {
    if (id == null) {
      return null;
    }
    return em().find(Employe.class, id);
  }

  public List<Employe> findAllEmploye() {
    TypedQuery<Employe> query = (em().createQuery("SELECT e FROM Employe e WHERE e.deleted is null ORDER BY e.nom", Employe.class));

    List<Employe> list = query.getResultList();

    return list;
  }

  public List<Employe> findAllEmployesActifs() {
    List<Employe> list = findAllEmploye();
    list = list.stream().filter(e -> e.isActif()).collect(Collectors.toList());
    return list;
  }

  public Employe findByUser(Long idUser) {
    Query query = em().createQuery("SELECT e FROM Employe e WHERE e.utilisateur.id = :id and e.deleted is null");
    query.setParameter("id", idUser);
    List<Employe> list = (List<Employe>) query.getResultList();

    if (list.size() == 0) {
      return null;
    }

    return list.get(0);
  }

  @Transactional
  public Employe saveEmploye(Employe employe) {
    if (employe.getId() != null) {
      employe = em().merge(employe);
    } else {
      em().persist(employe);
    }
    return employe;
  }


  public List<Employe> rechercheEmployeByNom(String searchText) {

    Query query = em().createQuery("SELECT r FROM Employe r WHERE (UPPER(function('unaccent', r.nom)) LIKE UPPER(function('unaccent', :nom)) OR UPPER(function('unaccent', r.prenom)) LIKE UPPER(function('unaccent', :nom))) and r.deleted is null ORDER BY r.nom");

    query.setParameter("nom", "%" + searchText + "%");

    List<Employe> list = (List<Employe>) query.getResultList();
    return list;
  }

}
