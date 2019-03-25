package sitecfacq.domaine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import sitecfacq.domaine.common.Fichier;
import sitecfacq.domaine.common.GescoEntity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

/**
 * Created by apaquet on 2016-08-15.
 */

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class Salle extends GescoEntity {
  private String nom;
  @OneToMany(cascade = CascadeType.PERSIST)
  private List<Fichier> fichiers;

  public String getNom() {
    return nom;
  }

  public void setNom(String nom) {
    this.nom = nom;
  }

  public List<Fichier> getFichiers() {
    return fichiers;
  }

  public void setFichiers(List<Fichier> fichiers) {
    this.fichiers = fichiers;
  }
}
