/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sitecfacq.services;

import ca.attsoft.web.framework.stateful.WebContext;
import microsoft.exchange.webservices.data.autodiscover.IAutodiscoverRedirectionUrl;
import microsoft.exchange.webservices.data.core.ExchangeService;
import microsoft.exchange.webservices.data.core.enumeration.misc.ExchangeVersion;
import microsoft.exchange.webservices.data.core.enumeration.property.BodyType;
import microsoft.exchange.webservices.data.core.service.item.EmailMessage;
import microsoft.exchange.webservices.data.credential.ExchangeCredentials;
import microsoft.exchange.webservices.data.credential.WebCredentials;
import microsoft.exchange.webservices.data.property.complex.MessageBody;
import sitecfacq.domaine.common.Fichier;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;


/**
 *
 * @author apaquet
 */
public class MailService {

  @Resource(lookup = "exchangeUrl") private String exchangeUrl;
  @Resource(lookup = "exchangeUser") private String exchangeUser;
  @Resource(lookup = "exchangePassword") private String exchangePassword;
  @Resource(lookup = "exchangeDomain") private String exchangeDomain;

  @Inject
  private FileService fileService;

  @Transactional
  public void send(List<String> emails, String subject, String message, List<Fichier> fichiers) throws Exception {
    try {
      ExchangeService service = new ExchangeService(ExchangeVersion.Exchange2010_SP2);
      service.setUrl(new URI(exchangeUrl));
      ExchangeCredentials credentials = new WebCredentials(exchangeUser, exchangePassword, exchangeDomain);
      service.setCredentials(credentials);

      EmailMessage msg= new EmailMessage(service);
      // msg.setMimeContent(new MimeContent("utf8", message.getBytes()));
      msg.setSubject(subject);
      MessageBody mb = new MessageBody();
      mb.setBodyType(BodyType.HTML);
      mb.setText(message);
      msg.setBody(mb);

      if(fichiers != null) {
        for (Fichier fichier : fichiers) {
          if (fichier.getFileImage() == null) {
            fichier.setFileImage(fileService.getFilePayload(fichier.getId(), fichier.getNom()));
          }
          if (fichier.getFileImage() != null && fichier.getFileImage().length > 0) {
            msg.getAttachments().addFileAttachment(fichier.getNom(), Arrays.copyOf(fichier.getFileImage(), fichier.getFileImage().length));
          }
        }
      }

      for(String email : emails) {
        msg.getToRecipients().add(email);
      }

      msg.send();
    } catch (Exception ex) {
      Logger.getLogger(MailService.class.getName()).log(Level.SEVERE, null, ex);
      WebContext.addErrorStatic("Échec de l'envoi du courriel");
      throw(ex);
    }
  }

  public void send(String email, String subject, String message, List<Fichier> fichiers) throws Exception {
    List<String> emails = new ArrayList<>();
    emails.add(email);
    send(emails, subject, message, fichiers);
  }

  public void send(String email, String subject, String message) throws Exception {
    List<String> emails = new ArrayList<>();
    emails.add(email);
    send(emails, subject, message, null);
  }

  static class RedirectionUrlCallback implements IAutodiscoverRedirectionUrl {
    public boolean autodiscoverRedirectionUrlValidationCallback(
      String redirectionUrl) {
      return redirectionUrl.toLowerCase().startsWith("https://");
    }
  }
}
