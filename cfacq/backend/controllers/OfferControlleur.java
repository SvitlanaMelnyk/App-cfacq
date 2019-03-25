package sitecfacq.web.controllers;

import ca.attsoft.web.framework.annotations.Json;
import ca.attsoft.web.framework.annotations.Name;
import ca.attsoft.web.framework.annotations.Public;
import sitecfacq.domaine.*;
import sitecfacq.services.OfferService;
import sitecfacq.web.interceptors.HistoryInterceptor;
import sitecfacq.web.interceptors.ValidationInterceptor;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

@Interceptors({ValidationInterceptor.class, HistoryInterceptor.class})
@Public
public class OfferControlleur extends ca.attsoft.web.framework.controlleurs.AbstractController {

  @Inject
  private OfferService serviceOffer;


  @Json
  @Public
  @Transactional
  public Boolean save(@Name("jsonOffer") Offer offer) {
    if (offer == null) {
      getContext().addError("bad");
      return false;
    }

    try {
      offer.setDate(new Date());
      serviceOffer.save(offer);
    } catch (Exception e) {
      getContext().addError("bad sad");
      Logger.getLogger(OfferControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    //todo: send email

    return true;
  }

  @Json
  @Public
  public List<Offer> getAll() {
    return serviceOffer.getAll();
  }

  @Json
  @Public
  public List<Offer> getAllPublished() {
    return serviceOffer.getAllPublished();
  }

  @Json
  @Public
  public List<Offer> filterOffer(@Name("city") ListCity city, @Name("typePost") ListTypePost typePost, @Name("categoryPost") ListCategoryPost categoryPost) {
    if ((city != null && city.getVilles() != null && city.getVilles().size() > 0) ||
      (typePost != null && typePost.getTypePostes() != null && typePost.getTypePostes().size() > 0) ||
      (categoryPost != null && categoryPost.getCategoriePostes() != null && categoryPost.getCategoriePostes().size() > 0)) {
      return serviceOffer.filterOffer(city.getVilles(), typePost.getTypePostes(), categoryPost.getCategoriePostes());
    } else {
      return serviceOffer.getAll();
    }
  }

  @Json
  @Public
  public Offer getById(@Name("id") Long id) {
    return serviceOffer.getById(id);
  }


  @Json
  @Transactional
  public Boolean supprimer(@Name("id") Long id) {
    Offer offre = serviceOffer.getById(id);
    if (offre == null) {
      getContext().addError("Erreur lors de la récupération de l'offre");
    }

    try {
      serviceOffer.delete(offre);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la suppression de l'offre");
      Logger.getLogger(CvControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    return true;
  }

  @Json
  @Transactional
  public Boolean togglePublished(@Name("id") Long id) {
    Offer offer = serviceOffer.getById(id);
    if (offer == null) {
      getContext().addError("Erreur lors de la récupération de l'offre");
    }

    try {
      offer.setPublished(!offer.isPublished());
      serviceOffer.save(offer);
    } catch (Exception e) {
      getContext().addError("Erreur lors de la publication de l'offre");
      Logger.getLogger(CvControlleur.class.toString()).log(Level.SEVERE, null, e);
      return false;
    }

    return true;
  }

}
