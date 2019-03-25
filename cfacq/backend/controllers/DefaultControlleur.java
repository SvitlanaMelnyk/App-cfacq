/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package sitecfacq.web.controllers;

import ca.attsoft.web.framework.annotations.API;
import ca.attsoft.web.framework.annotations.Json;

import java.util.Map;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.enterprise.inject.Default;
import javax.inject.Inject;

/**
 * @author andre
 */

public class DefaultControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  public void index() {
  }

  public void indexcontent() {
  }

  public void templatemenu() {
  }

  /**
   * Ping acts as a heartbeat when external apps need to verify if GescoTUAC is up and running
   */
  @Json
  @API
  public Boolean ping() {
    return true;
  }

}
