package sitecfacq.web.controllers;

import ca.attsoft.web.framework.annotations.Json;
import ca.attsoft.web.framework.annotations.Public;
import sitecfacq.domaine.JobTitle;
import sitecfacq.services.JobTitleService;
import sitecfacq.web.interceptors.HistoryInterceptor;
import sitecfacq.web.interceptors.ValidationInterceptor;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import java.util.List;

@Interceptors({ValidationInterceptor.class, HistoryInterceptor.class})
@Public
public class JobTitleControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  @Inject
  private JobTitleService service;

  @Json
  @Public
  public List<JobTitle> getAllJobTitles() {
    return service.getAllJobTitles();
  }

}
