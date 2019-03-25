package sitecfacq.services;

import sitecfacq.domaine.*;
import sitecfacq.services.common.GescoService;

import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class OfferService extends GescoService {
  @Transactional
  public Offer save(Offer offer) {

    if (offer.getId() == null) {
      em().persist(offer);
    } else {
      offer = em().merge(offer);
    }

    return offer;
  }

  @Transactional
  public Offer delete(Offer e) {
    e.setDeleted(new Date());
    e = em().merge(e);
    return e;
  }


  public List<Offer> getAll() {

    Query query = em().createQuery("SELECT o FROM Offer o " +
      "where o.deleted is null " +
      "ORDER BY o.date DESC");


    List<Offer> list = (List<Offer>) query.getResultList();
    return list;
  }

  public List<Offer> getAllPublished() {

    Query query = em().createQuery("SELECT o FROM Offer o " +
      "where o.published = true and o.deleted is null " +
      "ORDER BY o.date DESC");


    List<Offer> list = (List<Offer>) query.getResultList();
    return list;
  }

  public List<Offer> filterOffer(List<Ville> city, List<TypePoste> typePost, List<CategoriePoste> categoryPost) {


    String q = "WHERE ";
    String joins = "";

    if (city != null && city.size() > 0) {
      q += "o.city.id in :city and ";
    }

    if (typePost != null && typePost.size() > 0) {
      q += "tp.id in :typePost and ";
      joins += "JOIN o.typePostes tp ";
    }

    if (categoryPost != null && categoryPost.size() > 0) {
      q += "cp.id in :categoryPost and ";
      joins += "JOIN o.domaines cp ";
    }

    String s = "SELECT DISTINCT o FROM Offer o " + joins + q + "o.deleted is null";

    Query query = em().createQuery(s);


    if (city != null && city.size() > 0) {
      query.setParameter("city", city.stream().map(e -> e.getId()).collect(Collectors.toList()));
    }

    if (typePost != null && typePost.size() > 0) {
      query.setParameter("typePost", typePost.stream().map(e -> e.getId()).collect(Collectors.toList()));
    }

    if (categoryPost != null && categoryPost.size() > 0) {
      query.setParameter("categoryPost", categoryPost.stream().map(e -> e.getId()).collect(Collectors.toList()));
    }

    List<Offer> list = (List<Offer>) query.getResultList();
    return list;
  }


  public Offer getById(Long id) {
    return em().find(Offer.class, id);
  }
}
