package sitecfacq.services;

import sitecfacq.services.common.GescoService;

import javax.ejb.Singleton;
import javax.ejb.Startup;

/**
 * Created by gboudreau on 2016-03-17.
 */
@Singleton
@Startup
public class DefaultService extends GescoService {

  public void init() {
  }
}
