package sitecfacq.domaine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import sitecfacq.domaine.common.GescoEntity;
import sitecfacq.domaine.utils.SimpleDateDeserializer;
import sitecfacq.domaine.utils.SimpleDateSerializer;

import javax.persistence.*;
import java.util.Date;

/**
 * Created on 2018-11-27.
 */

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class Registration extends GescoEntity {

  private String name;
  private String surname;
  private String email;

  @ManyToOne
  private Ville city;
  private String address;
  private Number telephone;

  private Long cours;

  @Temporal(TemporalType.TIMESTAMP)
  private Date birthday;

  @Temporal(TemporalType.TIMESTAMP)
  private Date date;
  @Column(nullable = false, columnDefinition = "boolean default FALSE")
  private Boolean traite;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getSurname() {
    return surname;
  }

  public void setSurname(String surname) {
    this.surname = surname;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Ville getCity() {
    return city;
  }

  public void setCity(Ville city) {
    this.city = city;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public Number getTelephone() {
    return telephone;
  }

  public void setTelephone(Number telephone) {
    this.telephone = telephone;
  }


  public Long getCours() {
    return cours;
  }

  public void setCours(Long cours) {
    this.cours = cours;
  }

  @JsonSerialize(using = SimpleDateSerializer.class)
  public Date getDate() {
    return date;
  }

  @JsonDeserialize(using = SimpleDateDeserializer.class)
  public void setDate(Date date) {
    this.date = date;
  }

  public Date getBirthday() {
    return birthday;
  }

  public void setBirthday(Date birthday) {
    this.birthday = birthday;
  }

  public Boolean getTraite() {
    return traite;
  }

  public void setTraite(Boolean traite) {
    this.traite = traite;
  }
}
