package sitecfacq.domaine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import sitecfacq.domaine.common.GescoEntity;

import javax.persistence.Entity;
import java.util.List;

/**
 * Created on 2018-11-27.
 */

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@JsonIdentityInfo(generator=JSOGGenerator.class)
public class ListTypePost extends GescoEntity {

  private List<TypePoste> typePostes;

  public List<TypePoste> getTypePostes() {
    return typePostes;
  }

  public void setTypePostes(List<TypePoste> typePostes) {
    this.typePostes = typePostes;
  }
}
