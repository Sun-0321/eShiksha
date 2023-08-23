package com.exam.examportal.service.impl;

import com.exam.examportal.dao.CategoryRepository;
import com.exam.examportal.dao.QuizRepository;
import com.exam.examportal.model.exam.Category;
import com.exam.examportal.model.exam.Quiz;
import com.exam.examportal.service.QuizService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Service
public class QuizServiceImpl implements QuizService {


    private QuizRepository quizRepository;
    private CategoryRepository categoryRepository;

    public QuizServiceImpl(QuizRepository quizRepository){
        this.quizRepository = quizRepository;
    }

    @Override
    public Quiz addQuiz(Quiz quiz) {
        return this.quizRepository.save(quiz);
    }

    @Override
    public Quiz updatequiz(Quiz quiz) {
        return this.quizRepository.save(quiz);
    }

    @Override
    public Set<Quiz> getQuizzes() {
        return new HashSet<>(this.quizRepository.findAll());
    }

    @Override
    public void deleteQuiz(Long quizId) {
        this.quizRepository.deleteById(quizId);
    }

    @Override
    public Quiz getQuiz(Long quizId) {
        return quizRepository.findById(quizId).get();
    }

    @Override
    public Set<Quiz> getQuizzesByCategory(Category category) {
        return this.quizRepository.findByCategory(category);
    }

    @Override
    public List<Quiz> getActiveQuizzes() {
        List<Quiz> quizzes = this.quizRepository.findByActive(true);
        return quizzes;
    }

    @Override
    public List<Quiz> getActiveQuizzesOfCategory(Category category) {
        return this.quizRepository.findByCategoryAndActive(category,true);
    }


}
