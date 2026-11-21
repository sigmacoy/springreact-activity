package com.springreact.activity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must not exceed 50 characters")
    @Column(name = "firstname", nullable = false, length = 50)
    private String firstname;

    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name must not exceed 50 characters")
    @Column(name = "lastname", nullable = false, length = 50)
    private String lastname;

    @NotBlank(message = "Program is required")
    @Size(max = 100, message = "Program must not exceed 100 characters")
    @Column(name = "program", nullable = false, length = 100)
    private String program;

    @Column(name = "yearlevel")
    private Integer yearlevel;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "student_course",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    @JsonIgnore
    private List<Course> courses = new ArrayList<>();

    public Student() {
    }

    public Student(String firstname, String lastname, String program, Integer yearlevel) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.program = program;
        this.yearlevel = yearlevel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getProgram() {
        return program;
    }

    public void setProgram(String program) {
        this.program = program;
    }

    public Integer getYearlevel() {
        return yearlevel;
    }

    public void setYearlevel(Integer yearlevel) {
        this.yearlevel = yearlevel;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    public void addCourse(Course course) {
        courses.add(course);
        course.getStudents().add(this);
    }

    public void removeCourse(Course course) {
        courses.remove(course);
        course.getStudents().remove(this);
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", program='" + program + '\'' +
                ", yearlevel=" + yearlevel +
                ", coursesCount=" + (courses != null ? courses.size() : 0) +
                '}';
    }
}