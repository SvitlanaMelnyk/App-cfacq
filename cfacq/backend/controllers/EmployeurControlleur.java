package sitecfacq.web.controllers;

import ca.attsoft.web.framework.annotations.*;
import sitecfacq.domaine.Employeur;
import sitecfacq.services.EmployeurService;
import sitecfacq.web.interceptors.HistoryInterceptor;
import sitecfacq.web.interceptors.ValidationInterceptor;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import java.util.List;

@Interceptors({ValidationInterceptor.class, HistoryInterceptor.class})
@Public
public class EmployeurControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  @Inject
  private EmployeurService service;

  @Json
  @Public
  public List<Employeur> getAll(@Name("c") String critereDeRecherche) {
    return service.getAllEmployeur();
  }

}
