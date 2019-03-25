package sitecfacq.domaine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import org.eclipse.persistence.jpa.config.Cascade;
import sitecfacq.domaine.common.GescoEntity;
import sitecfacq.domaine.utils.SimpleDateDeserializer;
import sitecfacq.domaine.utils.SimpleDateSerializer;

import javax.persistence.*;
import java.sql.Array;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

/**
 * Created on 2018-11-27.
 */

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class Cv extends GescoEntity {

  private String summary;
  private JobTitle jobTitleCV;
  private List<String> competences;
  private String otherInformation;
  private String logo;
  @Temporal(TemporalType.TIMESTAMP)
  private Date date;
  private String link;

  @ManyToOne
  private Ville city;

  @OneToMany
  private List<TypePoste> typePost;

  @OneToMany
  private List<CategoriePoste> categoryPost;

  @ManyToOne(cascade = CascadeType.ALL)
  private Student student;

  @Column(nullable = false, columnDefinition = "boolean default FALSE")
  private boolean published;

  public String getSummary() {
    return summary;
  }

  public void setSummary(String summary) {
    this.summary = summary;
  }

  public JobTitle getJobTitleCV() {
    return jobTitleCV;
  }

  public void setJobTitleCV(JobTitle jobTitleCV) {
    this.jobTitleCV = jobTitleCV;
  }

  public List<String> getCompetences() {
    return competences;
  }

  public void setCompetences(List<String> competences) {
    this.competences = competences;
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

  @JsonSerialize(using = SimpleDateSerializer.class)
  public Date getDate() {
    return date;
  }

  @JsonDeserialize(using = SimpleDateDeserializer.class)
  public void setDate(Date date) {
    this.date = date;
  }

  public String getLink() {
    return link;
  }

  public void setLink(String link) {
    this.link = link;
  }

  public Ville getCity() {
    return city;
  }

  public void setCity(Ville city) {
    this.city = city;
  }

  public List<TypePoste> getTypePost() {
    return typePost;
  }

  public void setTypePost(List<TypePoste> typePost) {
    this.typePost = typePost;
  }

  public List<CategoriePoste> getCategoryPost() {
    return categoryPost;
  }

  public void setCategoryPost(List<CategoriePoste> categoryPost) {
    this.categoryPost = categoryPost;
  }

  public Student getStudent() {
    return student;
  }

  public void setStudent(Student student) {
    this.student = student;
  }

  public boolean isPublished() {
    return published;
  }

  public void setPublished(boolean published) {
    this.published = published;
  }
}
