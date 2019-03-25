/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package sitecfacq.services;

import ca.attsoft.web.framework.stateful.WebContext;
import sitecfacq.domaine.common.Fichier;
import sitecfacq.domaine.common.Utilisateur;
import sitecfacq.services.common.GescoService;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.persistence.Query;
import javax.transaction.Transactional;

/**
 * @author andre
 */

public class UserService extends GescoService {

  public void setPassword(Utilisateur user, String password) {
    UUID salt = UUID.randomUUID();
    user.setSalt(salt.toString());
    user.setIteration(3);

    byte[] pass = hashPassword(
      password.toCharArray(),
      user.getSalt().getBytes(),
      user.getIteration(),
      256);

    user.setHash(pass);
    save(user, password);
  }

  public Utilisateur find(String username) {
    Query query = em().createQuery("SELECT u FROM Utilisateur u WHERE UPPER(u.username) = UPPER(:username) and u.deleted is null");
    query.setParameter("username", username);
    try {
      List<Utilisateur> res = query.getResultList();
      if (res != null && res.size() > 0) {
        return res.get(0);
      }
      return null;
    } catch (Exception ex) {
      Logger.getLogger(UserService.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
    }
    return null;
  }

  public Utilisateur getById(Long id) {
    if (id == null) {
      return null;
    }
    return em().find(Utilisateur.class, id);
  }

  public List<Utilisateur> getAll() {
    Query query = em().createQuery("SELECT u FROM Utilisateur u WHERE u.deleted is null AND u.restricted = false ORDER BY u.username");
    return (List<Utilisateur>) query.getResultList();
  }

  public List<Utilisateur> getAllAdmin() {
    Query query = em().createQuery("SELECT u FROM Utilisateur u WHERE u.role.nom = :role and u.deleted is null AND u.restricted = false ORDER BY u.username");
    query.setParameter("role", "Administrateur");

    return (List<Utilisateur>) query.getResultList();
  }

  public Utilisateur findByToken(String token) {
    Query query = em().createQuery("SELECT e FROM Utilisateur e WHERE e.token = :token and e.deleted is null and e.restricted = false ORDER BY e.prenom");
    query.setParameter("token", token);

    List<Utilisateur> l = query.getResultList();
    if(l.size() > 0){
      return l.get(0);
    }

    return null;
  }

  @Transactional
  public Utilisateur save(Utilisateur user, String password) {
    if (user.getId() != null) {
      user = em().merge(user);
    } else {
      UUID salt = UUID.randomUUID();
      UUID secret = UUID.randomUUID();
      user.setSalt(salt.toString());
      user.setSecret(secret.toString());
      user.setIteration(3);
      if (password != null) {
        byte[] pass = hashPassword(
          password.toCharArray(),
          user.getSalt().getBytes(),
          user.getIteration(),
          256);

        user.setHash(pass);
      }
      em().persist(user);
    }
    return user;
  }

  public static byte[] hashPassword(final char[] password, final byte[] salt, final int iterations, final int keyLength) {
    try {
      SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
      PBEKeySpec spec = new PBEKeySpec(password, salt, iterations, keyLength);
      SecretKey key = skf.generateSecret(spec);
      byte[] res = key.getEncoded();
      return res;

    } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
      throw new RuntimeException(e);
    }
  }


  @Transactional
  public void delete(Utilisateur user) {
    user.setDeleted(new Date());
    em().merge(user);
  }


}
