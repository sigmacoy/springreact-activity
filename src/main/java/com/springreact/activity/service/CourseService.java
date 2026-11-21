package com.springreact.activity.service;

import com.springreact.activity.entity.Course;
import com.springreact.activity.entity.Teacher;
import com.springreact.activity.repository.CourseRepository;
import com.springreact.activity.repository.TeacherRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CourseService {

    private final CourseRepository courseRepository;
    private final TeacherRepository teacherRepository;

    public CourseService(CourseRepository courseRepository, TeacherRepository teacherRepository) {
        this.courseRepository = courseRepository;
        this.teacherRepository = teacherRepository;
    }

    @Transactional(readOnly = true)
    public List<Course> findAll() {
        return courseRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Course> findById(Long id) {
        return courseRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Course> findByTeacherId(Long teacherId) {
        return courseRepository.findByTeacherId(teacherId);
    }

    public Course create(Course course) {
        if (courseRepository.existsByCourseCode(course.getCourseCode())) {
            throw new IllegalArgumentException("Course with code " + course.getCourseCode() + " already exists");
        }

        if (course.getTeacher() == null || course.getTeacher().getId() == null) {
            throw new IllegalArgumentException("Teacher is required for course creation");
        }

        Teacher teacher = teacherRepository.findById(course.getTeacher().getId())
                .orElseThrow(() -> new IllegalArgumentException("Teacher not found with id: " + course.getTeacher().getId()));

        course.setTeacher(teacher);
        return courseRepository.save(course);
    }

    public Course update(Long id, Course courseDetails) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Course not found with id: " + id));

        if (!course.getCourseCode().equals(courseDetails.getCourseCode()) &&
                courseRepository.existsByCourseCode(courseDetails.getCourseCode())) {
            throw new IllegalArgumentException("Course with code " + courseDetails.getCourseCode() + " already exists");
        }

        Teacher teacher = teacherRepository.findById(courseDetails.getTeacher().getId())
                .orElseThrow(() -> new IllegalArgumentException("Teacher not found with id: " + courseDetails.getTeacher().getId()));

        course.setName(courseDetails.getName());
        course.setDescription(courseDetails.getDescription());
        course.setCourseCode(courseDetails.getCourseCode());
        course.setCredits(courseDetails.getCredits());
        course.setTeacher(teacher);

        return courseRepository.save(course);
    }

    public void delete(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new IllegalArgumentException("Course not found with id: " + id);
        }
        courseRepository.deleteById(id);
    }
}