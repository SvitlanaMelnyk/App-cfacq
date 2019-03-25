package sitecfacq.domaine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import sitecfacq.domaine.common.Adresse;
import sitecfacq.domaine.common.GescoEntity;
import sitecfacq.domaine.utils.SimpleDateDeserializer;
import sitecfacq.domaine.utils.SimpleDateSerializer;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Created on 2018-11-27.
 */

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@JsonIdentityInfo(generator=JSOGGenerator.class)
public class Event extends GescoEntity {

  private String name;
  private String description;
  @Column(precision = 18, scale = 4)
  private BigDecimal price;
  @Temporal(TemporalType.TIMESTAMP)
  private Date dateStart;
  @Temporal(TemporalType.TIMESTAMP)
  private Date dateEnd;
  @ManyToOne
  private Poste poste;

  private String color;
  @ManyToOne
  private Ville ville;
  @OneToOne(cascade = CascadeType.ALL)
  private Adresse adresse;

  public String getName() {
    return name;
  }

  public void setName(String name) {

    this.name = name;
  }

  @JsonSerialize(using = SimpleDateSerializer.class)
  public Date getDateStart() {
    return dateStart;
  }

  @JsonDeserialize(using = SimpleDateDeserializer.class)
  public void setDateStart(Date dateStart) {
    this.dateStart = dateStart;
  }

  @JsonSerialize(using = SimpleDateSerializer.class)
  public Date getDateEnd() {
    return dateEnd;
  }

  @JsonDeserialize(using = SimpleDateDeserializer.class)
  public void setDateEnd(Date dateEnd) {
    this.dateEnd = dateEnd;
  }

  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
  }

  public Ville getVille() {
    return ville;
  }

  public void setVille(Ville ville) {
    this.ville = ville;
  }

  public String getDescription() { return description; }

  public void setDescription(String description) { this.description = description; }

  public BigDecimal getPrice() { return price; }

  public void setPrice(BigDecimal price) { this.price = price; }

  public Poste getPoste() { return poste; }

  public void setPoste(Poste poste) { this.poste = poste; }

  public Adresse getAdresse() {
    return adresse;
  }

  public void setAdresse(Adresse adresse) {
    this.adresse = adresse;
  }
}
