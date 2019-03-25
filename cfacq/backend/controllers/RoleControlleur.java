package sitecfacq.web.controllers;

import ca.attsoft.web.framework.annotations.Json;
import ca.attsoft.web.framework.annotations.Name;
import ca.attsoft.web.framework.annotations.Public;
import sitecfacq.domaine.common.Role;
import sitecfacq.services.RoleService;
import sitecfacq.web.interceptors.HistoryInterceptor;
import sitecfacq.web.interceptors.ValidationInterceptor;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import javax.transaction.Transactional;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Interceptors({ValidationInterceptor.class, HistoryInterceptor.class})
@Public
public class RoleControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  @Inject
  private RoleService service;

  @Json
  @Transactional
  public Boolean save(@Name("json") Role role) {
    if (role == null) {
      getContext().addError("Erreur lors de la sauvegarde du rôle");
      return false;
    }

    try {
      service.save(role);
    } catch (Exception e) {
      getContext().addError("bad sad");
      Logger.getLogger(RoleControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }
    return true;
  }

  @Json
  @Public
  public List<Role> getAll() {
    List<Role> l = service.getAll();
    return l;
  }

  @Json
  @Transactional
  public Boolean supprimer(@Name("id") Long id) {
    Role role = service.getById(id);
    if (role == null) {
      getContext().addError("Erreur lors de la récupération du rôle");
    }

    try {
      service.delete(role);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la suppression du rôle");
      Logger.getLogger(CvControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    return true;
  }

}
