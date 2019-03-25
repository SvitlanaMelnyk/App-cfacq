package sitecfacq.domaine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import sitecfacq.domaine.common.Adresse;
import sitecfacq.domaine.common.Fichier;
import sitecfacq.domaine.common.GescoEntity;
import sitecfacq.domaine.common.Personne;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.List;

/**
 * Created by apaquet on 2016-08-15.
 */

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class Local extends GescoEntity {
  private String nom;
  private List<Salle> salles;
  private Bureau bureau;

  public String getNom() {
    return nom;
  }

  public void setNom(String nom) {
    this.nom = nom;
  }

  public List<Salle> getSalles() {
    return salles;
  }

  public void setSalles(List<Salle> salles) {
    this.salles = salles;
  }

  public Bureau getBureau() {
    return bureau;
  }

  public void setBureau(Bureau bureau) {
    this.bureau = bureau;
  }
}
