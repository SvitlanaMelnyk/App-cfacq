package sitecfacq.domaine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import sitecfacq.domaine.common.GescoEntity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

/**
 * Created on 2018-11-27.
 */

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class Student extends GescoEntity {

  private String name;
  private String surname;
  private String email;

  @ManyToOne
  private Ville city;
  private String address;
  private Number telephone;

  private Long cours;

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
}
