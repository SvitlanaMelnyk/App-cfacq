package sitecfacq.web.controllers;

import ca.attsoft.web.framework.annotations.Json;
import ca.attsoft.web.framework.annotations.Public;
import sitecfacq.domaine.TypePoste;
import sitecfacq.services.TypePosteService;
import sitecfacq.web.interceptors.HistoryInterceptor;
import sitecfacq.web.interceptors.ValidationInterceptor;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import java.util.List;

@Interceptors({ValidationInterceptor.class, HistoryInterceptor.class})
@Public
public class TypePosteControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  @Inject
  private TypePosteService service;

  @Json
  @Public
  public List<TypePoste> getAllTypePoste() {
    return service.getAllTypePoste();
  }

}
