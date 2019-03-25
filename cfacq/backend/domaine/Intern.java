package sitecfacq.domaine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import sitecfacq.domaine.common.GescoEntity;
import sitecfacq.domaine.utils.SimpleDateDeserializer;
import sitecfacq.domaine.utils.SimpleDateSerializer;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

/**
 * Created on 2018-11-27.
 */

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@JsonIdentityInfo(generator=JSOGGenerator.class)

public class Intern extends GescoEntity {

    private String companyName;

    @ManyToOne
    private Ville city;
    private String address;
    private Number telephone;
    private String sectorActivity;
    private Number nbreEmployee;
    private String website;
    private String nameResponsPerson;
    private Number telephoneResponsPerson;
    private String emailResponsPerson;
    private String postDetail;
    private Number nbreIntern;
    private String getJob;
    private String getSalary;
    private String additionalInfo;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;


    public String getCompanyName() {
      return companyName;
    }

    public void setCompanyName(String companyName) {
      this.companyName = companyName;
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

    public String getSectorActivity() {
      return sectorActivity;
    }

    public void setSectorActivity(String sectorActivity) {
      this.sectorActivity = sectorActivity;
    }

    public Number getNbreEmployee() {
      return nbreEmployee;
    }

    public void setNbreEmployee(Number nbreEmployee) {
      this.nbreEmployee = nbreEmployee;
    }

    public String getWebsite() {
        return website;
      }

    public void setWebsite(String website) {
      this.website = website;
    }

    public String getNameResponsPerson() {
      return nameResponsPerson;
    }

    public void setNameResponsPerson(String nameResponsPerson) {
      this.nameResponsPerson = nameResponsPerson;
    }

    public Number getTelephoneResponsPerson() {
      return telephoneResponsPerson;
    }

    public void setTelephoneResponsPerson(Number telephoneResponsPerson) {
      this.telephoneResponsPerson = telephoneResponsPerson;
    }

    public String getEmailResponsPerson() {
      return emailResponsPerson;
    }

    public void setEmailResponsPerson(String emailResponsPerson) {
      this.emailResponsPerson = emailResponsPerson;
    }

    public String getPostDetail() {
      return postDetail;
    }

    public void setPostDetail(String postDetail) {
      this.postDetail = postDetail;
    }

    public Number getNbreIntern() {
      return nbreIntern;
    }

    public void setNbreIntern(Number nbreIntern) {
      this.nbreIntern = nbreIntern;
    }

    public String getGetJob() {
      return getJob;
    }

    public void setGetJob(String getJob) {
      this.getJob = getJob;
    }

    public String getGetSalary() {
      return getSalary;
    }

    public void setGetSalary(String getSalary) {
      this.getSalary = getSalary;
    }

    public String getAdditionalInfo() {
      return additionalInfo;
    }

    public void setAdditionalInfo(String additionalInfo) {
      this.additionalInfo = additionalInfo;
    }


   @JsonSerialize(using = SimpleDateSerializer.class)
    public Date getDate() {
      return date;
    }

   @JsonDeserialize(using = SimpleDateDeserializer.class)
    public void setDate(Date date) {
      this.date = date;
    }
}
