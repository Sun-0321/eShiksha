package com.exam.examportal.dao;

import com.exam.examportal.model.exam.Category;
import com.exam.examportal.model.exam.Question;
import com.exam.examportal.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;


public interface QuizRepository extends JpaRepository<Quiz,Long> {
    Set<Quiz> findByCategory(Category category);

    List<Quiz> findByActive(boolean b);


    List<Quiz> findByCategoryAndActive(Category category, boolean b);
}
