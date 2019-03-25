package sitecfacq.web.controllers;

import ca.attsoft.web.framework.annotations.Json;
import ca.attsoft.web.framework.annotations.Public;
import sitecfacq.domaine.CategoriePoste;
import sitecfacq.services.CategoriePosteService;
import sitecfacq.web.interceptors.HistoryInterceptor;
import sitecfacq.web.interceptors.ValidationInterceptor;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import java.util.List;

@Interceptors({ValidationInterceptor.class, HistoryInterceptor.class})
@Public
public class CategoriePosteControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  @Inject
  private CategoriePosteService service;

  @Json
  @Public
  public List<CategoriePoste> getAllCategoriePoste() {
    return service.getAllCategoriePoste();
  }

}
