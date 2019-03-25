package sitecfacq.domaine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import sitecfacq.domaine.common.Fichier;
import sitecfacq.domaine.common.GescoEntity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import java.util.Date;

/**
 * Created on 2018-11-27.
 */

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@JsonIdentityInfo(generator=JSOGGenerator.class)
public class AboutUs extends GescoEntity {

  private String name;
  private String description;
  @OneToOne
  private Fichier image;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Fichier getImage() {
    return image;
  }

  public void setImage(Fichier image) {
    this.image = image;
  }
}
