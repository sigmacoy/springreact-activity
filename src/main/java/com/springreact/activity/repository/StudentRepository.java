package com.springreact.activity.repository;

import com.springreact.activity.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findByProgram(String program);

    List<Student> findByYearlevel(Integer yearlevel);

    Optional<Student> findByFirstnameAndLastname(String firstname, String lastname);
}