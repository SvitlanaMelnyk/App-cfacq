package sitecfacq.services;

import sitecfacq.domaine.Student;
import sitecfacq.services.common.GescoService;

import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

public class StudentService extends GescoService {

  @Transactional
  public Student save(Student student) {

    if (student.getId() == null) {
      em().persist(student);
    } else {
      student = em().merge(student);
    }

    return student;
  }

}
