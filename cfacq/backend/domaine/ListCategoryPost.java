package sitecfacq.domaine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import sitecfacq.domaine.common.GescoEntity;

import javax.persistence.Entity;
import java.util.List;

/**
 * Created on 2018-11-27.
 */

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@JsonIdentityInfo(generator=JSOGGenerator.class)
public class ListCategoryPost extends GescoEntity {

  private List<CategoriePoste> categoriePostes;

  public List<CategoriePoste> getCategoriePostes() {
    return categoriePostes;
  }

  public void setCategoriePostes(List<CategoriePoste> categoriePostes) {
    this.categoriePostes = categoriePostes;
  }
}
