package sitecfacq.domaine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import sitecfacq.domaine.common.Personne;
import sitecfacq.domaine.common.Utilisateur;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by apaquet on 2016-08-15.
 */

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type")
@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@JsonIdentityInfo(generator=JSOGGenerator.class)
public class Employe extends Personne {
    @OneToOne
    private Utilisateur utilisateur;
    private String code;
    @Temporal(TemporalType.DATE)
    private Date dateEmbauche;
    @Temporal(TemporalType.DATE)
    private Date dateAnciennete;
    @Temporal(TemporalType.DATE)
    private Date dateTermine;
    private boolean actif;
    @Column(precision = 18, scale = 4)
    private BigDecimal perDiem203;
    @Column(precision = 18, scale = 4)
    private BigDecimal forfaitaire231;
    @Column(precision = 18, scale = 4)
    private BigDecimal allocationAuto209;
    @Column(precision = 18, scale = 4)
    private BigDecimal ajustementSalaire351;
    @Column(precision = 18, scale = 4)
    private BigDecimal heureType;

    public BigDecimal getPerDiem203() {
        return perDiem203;
    }

    public void setPerDiem203(BigDecimal perDiem203) {
        this.perDiem203 = perDiem203;
    }

    public BigDecimal getForfaitaire231() {
        return forfaitaire231;
    }

    public void setForfaitaire231(BigDecimal forfaitaire231) {
        this.forfaitaire231 = forfaitaire231;
    }

    public BigDecimal getAllocationAuto209(){
        return allocationAuto209;
    }

    public void setAllocationAuto209(BigDecimal allocationAuto209){
        this.allocationAuto209 = allocationAuto209;
    }

    public BigDecimal getAjustementSalaire351(){
        return ajustementSalaire351;
    }

    public void setAjustementSalaire351(BigDecimal ajustementSalaire351){
        this.ajustementSalaire351 = ajustementSalaire351;
    }

    public Utilisateur getUtilisateur() {return utilisateur;}

    public void setUtilisateur(Utilisateur utilisateur) {this.utilisateur = utilisateur;}

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Date getDateEmbauche() {
        return dateEmbauche;
    }

    public void setDateEmbauche(Date dateEmbauche) {
        this.dateEmbauche = dateEmbauche;
    }

    public Date getDateAnciennete() {
        return dateAnciennete;
    }

    public void setDateAnciennete(Date dateAnciennete) {
        this.dateAnciennete = dateAnciennete;
    }

    public Date getDateTermine() {
        return dateTermine;
    }

    public void setDateTermine(Date dateTermine) {
        this.dateTermine = dateTermine;
    }
    public boolean isActif() {
        return actif;
    }
    public void setActif(boolean actif) {
        this.actif = actif;
    }

    public String getType() {
        return "employe";
    }

    public BigDecimal getHeureType() {
        return heureType;
    }

    public void setHeureType(BigDecimal heureType) {
        this.heureType = heureType;
    }

}
