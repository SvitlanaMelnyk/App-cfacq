package sitecfacq.domaine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import sitecfacq.domaine.common.Fichier;
import sitecfacq.domaine.common.GescoEntity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class FichierAccueillirStagiaire extends GescoEntity {
  @OneToOne(cascade = CascadeType.ALL)
  private Fichier fichier;

  public Fichier getFichier() {
    return fichier;
  }

  public void setFichier(Fichier fichier) {
    this.fichier = fichier;
  }
}
