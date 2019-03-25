package sitecfacq.domaine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import sitecfacq.domaine.common.Fichier;
import sitecfacq.domaine.common.GescoEntity;
import sitecfacq.domaine.utils.SimpleDateDeserializer;
import sitecfacq.domaine.utils.SimpleDateSerializer;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created on 2018-11-27.
 */

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class CvFichier extends GescoEntity {
  @Temporal(TemporalType.TIMESTAMP)
  private Date date;
  @OneToOne(cascade = CascadeType.PERSIST)
  private Fichier fichier;

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  public Fichier getFichier() {
    return fichier;
  }

  public void setFichier(Fichier fichier) {
    this.fichier = fichier;
  }
}
