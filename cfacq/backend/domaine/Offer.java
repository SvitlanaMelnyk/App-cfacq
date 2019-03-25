package sitecfacq.domaine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import sitecfacq.domaine.common.GescoEntity;
import sitecfacq.domaine.utils.SimpleDateDeserializer;
import sitecfacq.domaine.utils.SimpleDateSerializer;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

/**
 * Created on 2018-11-27.
 */

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class Offer extends GescoEntity {


  private String title;
  private String nameEmployer;
  @ManyToOne
  private Ville city;
  private String address;
  private String telephone;
  private String email;
  private String sector;
  private String website;
  private String contactName;
  private String contactTelephone;
  private String contactEmail;
  @OneToMany
  private List<CategoriePoste> domaines;
  private String physicalAddress;
  @OneToMany
  private List<TypePoste> typePostes;
  private String summary;
  private List<String> tasks;
  private List<String> competences;
  private List<String> requirements;
  private String otherInformation;
  private String logo;
  @Temporal(TemporalType.TIMESTAMP)
  private Date date;
  @Column(nullable = false, columnDefinition = "boolean default FALSE")
  private boolean published;

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getNameEmployer() {
    return nameEmployer;
  }

  public void setNameEmployer(String nameEmployer) {
    this.nameEmployer = nameEmployer;
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

  public String getTelephone() {
    return telephone;
  }

  public void setTelephone(String telephone) {
    this.telephone = telephone;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getSector() {
    return sector;
  }

  public void setSector(String sector) {
    this.sector = sector;
  }

  public String getWebsite() {
    return website;
  }

  public void setWebsite(String website) {
    this.website = website;
  }

  public String getContactName() {
    return contactName;
  }

  public void setContactName(String contactName) {
    this.contactName = contactName;
  }

  public String getContactTelephone() {
    return contactTelephone;
  }

  public void setContactTelephone(String contactTelephone) {
    this.contactTelephone = contactTelephone;
  }

  public String getContactEmail() {
    return contactEmail;
  }

  public void setContactEmail(String contactEmail) {
    this.contactEmail = contactEmail;
  }

  public List<CategoriePoste> getDomaines() {
    return domaines;
  }

  public void setDomaines(List<CategoriePoste> domaines) {
    this.domaines = domaines;
  }

  public String getPhysicalAddress() {
    return physicalAddress;
  }

  public void setPhysicalAddress(String physicalAddress) {
    this.physicalAddress = physicalAddress;
  }

  public List<TypePoste> getTypePostes() {
    return typePostes;
  }

  public void setTypePostes(List<TypePoste> typePostes) {
    this.typePostes = typePostes;
  }

  public String getSummary() {
    return summary;
  }

  public void setSummary(String summary) {
    this.summary = summary;
  }

  public List<String> getTasks() {
    return tasks;
  }

  public void setTasks(List<String> tasks) {
    this.tasks = tasks;
  }

  public List<String> getCompetences() {
    return competences;
  }

  public void setCompetences(List<String> competences) {
    this.competences = competences;
  }

  public List<String> getRequirements() {
    return requirements;
  }

  public void setRequirements(List<String> requirements) {
    this.requirements = requirements;
  }

  public String getOtherInformation() {
    return otherInformation;
  }

  public void setOtherInformation(String otherInformation) {
    this.otherInformation = otherInformation;
  }

  public String getLogo() {
    return logo;
  }

  public void setLogo(String logo) {
    this.logo = logo;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  public boolean isPublished() {
    return published;
  }

  public void setPublished(boolean published) {
    this.published = published;
  }
}
