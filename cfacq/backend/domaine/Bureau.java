package sitecfacq.domaine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import sitecfacq.domaine.common.Adresse;
import sitecfacq.domaine.common.GescoEntity;

import javax.persistence.*;
import java.util.List;

/**
 * Created by apaquet on 2016-08-15.
 */

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class Bureau extends GescoEntity {
  private String nom;
  @OneToOne(cascade = CascadeType.ALL)
  private Adresse adresse;
  private List<Local> locaux;
  private List<Poste> postes;

  public String getNom() {
    return nom;
  }

  public void setNom(String nom) {
    this.nom = nom;
  }

  public Adresse getAdresse() {
    return adresse;
  }

  public void setAdresse(Adresse adresse) {
    this.adresse = adresse;
  }

  public List<Local> getLocaux() {
    return locaux;
  }

  public void setLocaux(List<Local> locaux) {
    this.locaux = locaux;
  }

  public List<Poste> getPostes() {
    return postes;
  }

  public void setPostes(List<Poste> postes) {
    this.postes = postes;
  }
}
