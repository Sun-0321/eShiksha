package com.exam.examportal.dao;

import com.exam.examportal.model.exam.Question;
import com.exam.examportal.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.desktop.QuitStrategy;
import java.util.Set;

public interface QuestionRepository extends JpaRepository<Question,Long> {
    Set<Question> findByQuiz(Quiz quiz);

}
