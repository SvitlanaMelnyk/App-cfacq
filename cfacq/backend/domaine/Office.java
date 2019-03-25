package sitecfacq.domaine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import sitecfacq.domaine.common.GescoEntity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.util.List;

/**
 * Created on 2018-11-27.
 */

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type")
@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@JsonIdentityInfo(generator=JSOGGenerator.class)
public class Office extends GescoEntity {

    @ManyToOne
    private Ville city;

    private List<String> text;
    private List<String> images;

    public Ville getCity() {
      return city;
    }

    public void setCity(Ville city) {
      this.city = city;
    }

    public List<String> getText() {
        return text;
    }

    public void setText(List<String> text) {
      this.text = text;
    }

    public List<String> getImages() {
        return images;
      }

    public void setImages(List<String> images) {
      this.images = images;
    }
}
