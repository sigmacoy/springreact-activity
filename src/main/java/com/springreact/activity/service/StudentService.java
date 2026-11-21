package com.springreact.activity.service;

import com.springreact.activity.entity.Student;
import com.springreact.activity.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Transactional(readOnly = true)
    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Student> findById(Long id) {
        return studentRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Student> findByProgram(String program) {
        return studentRepository.findByProgram(program);
    }

    @Transactional(readOnly = true)
    public List<Student> findByYearlevel(Integer yearlevel) {
        return studentRepository.findByYearlevel(yearlevel);
    }

    public Student create(Student student) {
        return studentRepository.save(student);
    }

    public Student update(Long id, Student studentDetails) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Student not found with id: " + id));

        student.setFirstname(studentDetails.getFirstname());
        student.setLastname(studentDetails.getLastname());
        student.setProgram(studentDetails.getProgram());
        student.setYearlevel(studentDetails.getYearlevel());

        return studentRepository.save(student);
    }

    public void delete(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new IllegalArgumentException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }
}