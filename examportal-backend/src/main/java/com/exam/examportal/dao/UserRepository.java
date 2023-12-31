package com.exam.examportal.dao;

import com.exam.examportal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Long> {

    public User findByUsername(String username);
}
