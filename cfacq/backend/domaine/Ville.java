package sitecfacq.domaine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import sitecfacq.domaine.common.GescoEntity;
import sitecfacq.domaine.common.Personne;
import sitecfacq.domaine.common.Utilisateur;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Created on 2018-11-27.
 */


@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@JsonIdentityInfo(generator=JSOGGenerator.class)
public class Ville extends GescoEntity {

  private String name;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

}
