/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package sitecfacq.domaine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import sitecfacq.domaine.parametres.Parametre;

import javax.persistence.*;
import javax.persistence.Temporal;
import javax.persistence.Transient;
import java.util.Date;

/**
 *
 * @author apaquet
 */
@Entity
@JsonIdentityInfo(generator=JSOGGenerator.class)
public class TypeUnite extends Parametre {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3373020166687549588L;
	@Temporal(javax.persistence.TemporalType.TIMESTAMP)
	private Date deleted;

	@Transient
	public String getType(){
		return "typeUnite";
	}
		
}
