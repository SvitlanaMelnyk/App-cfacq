package sitecfacq.domaine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import sitecfacq.domaine.common.Fichier;
import sitecfacq.domaine.common.GescoEntity;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created on 2018-11-27.
 */

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@JsonIdentityInfo(generator=JSOGGenerator.class)
public class Actualite extends GescoEntity {
    private String name;
    @Lob
    private String description;
    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Fichier> images;
    private String category;
    private Date date;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Fichier> getImages() {
      return images;
    }

    public void setImages(List<Fichier> images) {
      this.images = images;
    }

    public String getCategory() {
      return category;
    }

    public void setCategory(String category) {
      this.category = category;
    }

    public Date getDate() {
      return date;
    }

    public void setDate(Date date) {
      this.date = date;
    }
}
