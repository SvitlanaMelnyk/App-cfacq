/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package sitecfacq.services;

import sitecfacq.domaine.common.Role;
import sitecfacq.services.common.GescoService;

import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

/**
 * @author andre
 */

public class RoleService extends GescoService {

  public Role getById(Long id) {
    if (id == null) {
      return null;
    }
    return em().find(Role.class, id);
  }

  public List<Role> getAll() {
    Query query = em().createQuery("SELECT u FROM Role u WHERE u.deleted is null and u.restricted = false ORDER BY u.nom");
    return (List<Role>) query.getResultList();
  }

  @Transactional
  public Role save(Role e) {
    if (e.getId() != null) {
      e = em().merge(e);
    } else {
      em().persist(e);
    }
    return e;
  }


  @Transactional
  public Role delete(Role e) {
    e.setDeleted(new Date());
    e = em().merge(e);
    return e;
  }
}
