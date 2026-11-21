package com.springreact.activity.service;

import com.springreact.activity.entity.Teacher;
import com.springreact.activity.repository.TeacherRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TeacherService {

    private final TeacherRepository teacherRepository;

    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @Transactional(readOnly = true)
    public List<Teacher> findAll() {
        return teacherRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Teacher> findById(Long id) {
        return teacherRepository.findById(id);
    }

    public Teacher create(Teacher teacher) {
        if (teacherRepository.existsByEmail(teacher.getEmail())) {
            throw new IllegalArgumentException("Teacher with email " + teacher.getEmail() + " already exists");
        }
        return teacherRepository.save(teacher);
    }

    public Teacher update(Long id, Teacher teacherDetails) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Teacher not found with id: " + id));

        if (!teacher.getEmail().equals(teacherDetails.getEmail()) &&
                teacherRepository.existsByEmail(teacherDetails.getEmail())) {
            throw new IllegalArgumentException("Teacher with email " + teacherDetails.getEmail() + " already exists");
        }

        teacher.setFirstName(teacherDetails.getFirstName());
        teacher.setLastName(teacherDetails.getLastName());
        teacher.setEmail(teacherDetails.getEmail());
        teacher.setPhone(teacherDetails.getPhone());
        teacher.setDepartment(teacherDetails.getDepartment());

        return teacherRepository.save(teacher);
    }

    public void delete(Long id) {
        if (!teacherRepository.existsById(id)) {
            throw new IllegalArgumentException("Teacher not found with id: " + id);
        }
        try {
            teacherRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalStateException("Cannot delete teacher with associated courses. Remove courses first.");
        }
    }
}