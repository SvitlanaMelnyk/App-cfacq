package sitecfacq.web.controllers;

import ca.attsoft.web.framework.annotations.Json;
import ca.attsoft.web.framework.annotations.Public;
import sitecfacq.domaine.Cv;
import sitecfacq.domaine.Event;
import sitecfacq.domaine.Ville;
import sitecfacq.services.CvService;
import sitecfacq.services.VilleService;
import sitecfacq.web.interceptors.HistoryInterceptor;
import sitecfacq.web.interceptors.ValidationInterceptor;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Interceptors({ValidationInterceptor.class, HistoryInterceptor.class})
@Public
public class VilleControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  @Inject
  private VilleService service;
  @Inject
  private CvService serviceCv;

  @Json
  @Public
  public List<Ville> getAll() {
    return service.getAll();
  }

  @Json
  @Public
  public List<Ville> getAllForCv() {
    List<Cv> cvs = serviceCv.getAll();

    List<Ville> villes = cvs.stream().map(e -> e.getCity()).filter(distinctByKey(e -> e.getId())).collect(Collectors.toList());

    return villes;
  }

  public static <T> Predicate<T> distinctByKey(Function<? super T, ?> keyExtractor) {
    Set<Object> seen = ConcurrentHashMap.newKeySet();
    return t -> seen.add(keyExtractor.apply(t));
  }
}
