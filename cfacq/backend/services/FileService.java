package sitecfacq.services;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.logging.Level;
import java.util.logging.Logger;

@LocalBean

public class FileService {

  public FileService() {

  }

  @Resource(lookup = "userFilePath")
  private String userFilePath; // = "c:\\temp";

  public void saveFile(Long id, String nom, byte[] payload) {
    saveFile(id, nom, payload, userFilePath);
  }

  public byte[] getFilePayload(Long id, String nom) {
    return getFile(id, nom, userFilePath);
  }

  private void saveFile(Long id, String nom, byte[] payload, String basePath) {
    FileOutputStream fos = null;
    try {
      File file = new File(basePath + "\\" + contructPath(id, nom));
      // if file doesnt exists, then create it
      if (!file.exists()) {
        String dirs = file.getPath().substring(0, file.getPath().lastIndexOf("\\"));
        File dirsFile = new File(dirs);
        dirsFile.mkdirs();
        file.createNewFile();
      }
      fos = new FileOutputStream(file.getAbsolutePath());
      fos.write(payload);
    } catch (IOException ex) {
      Logger.getLogger(FileService.class.getName()).log(Level.SEVERE, null, ex);
    } finally {
      try {
        if (fos != null) {
          fos.close();
        }
      } catch (IOException ex) {
        Logger.getLogger(FileService.class.getName()).log(Level.SEVERE, null, ex);
      }
    }
  }

  private byte[] getFile(Long id, String nom, String basePath) {
    String fullPath = basePath + contructPath(id, nom);
    File file = new File(fullPath);
    if (file.canRead()) {
      try {
        Path path = Paths.get(fullPath);
        byte[] payload = Files.readAllBytes(path);
        return payload;
      } catch (IOException ex) {
        Logger.getLogger(FileService.class.getName()).log(Level.SEVERE, null, ex);
      }
    }
    return null;
  }

  private String contructPath(Long id, String nom) {
    String idStr = id.toString();
    StringBuilder sb = new StringBuilder("\\");
    if (id < 100) {
      sb.append("000\\");
      sb.append(idStr);
      sb.append("\\");
      sb.append(nom);
    } else {
      sb.append(idStr.substring(0, 3));
      sb.append("\\");
      sb.append(idStr);
      sb.append("\\");
      sb.append(nom);
    }
    return sb.toString();
  }
}
