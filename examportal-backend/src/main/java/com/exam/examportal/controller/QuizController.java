package com.exam.examportal.controller;

import com.exam.examportal.model.exam.Category;
import com.exam.examportal.model.exam.Question;
import com.exam.examportal.model.exam.Quiz;
import com.exam.examportal.service.CategoryService;
import com.exam.examportal.service.impl.CategoryServiceImpl;
import com.exam.examportal.service.impl.QuizServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("quiz")
@CrossOrigin("*")
public class QuizController {
    @Autowired
    private QuizServiceImpl quizService;

    @Autowired
    private CategoryServiceImpl categoryService;

    @PostMapping("")
    public Quiz addQuiz(@RequestBody Quiz quiz){
        return quizService.addQuiz(quiz);
    }

    @GetMapping("/{id}")
    public Quiz getQuiz(@PathVariable("id") Long qId){
        return quizService.getQuiz(qId);
    }

    @GetMapping("")
    public Set<Quiz> getQuiz(){
        return quizService.getQuizzes();
    }



    @DeleteMapping("/{id}")
    public void deleteQuiz(@PathVariable("id") Long id){
        System.out.println(id);
        quizService.deleteQuiz(id);
    }

    @PutMapping("")
    public Quiz updateQuiz(@RequestBody Quiz quiz){
        return quizService.updatequiz(quiz);
    }

    @GetMapping("getByCategory/{catId}")
    public Set<Quiz> getQuizzesByCategory(@PathVariable("catId") Long catId){
        Category category = this.categoryService.getCategory(catId);
        return category.getQuizzes();
//        return quizService.getQuizzesByCategory(category);
    }


    @GetMapping("/active")
    public List<Quiz> getActiveQuizzes(){
        return this.quizService.getActiveQuizzes();
    }

    @GetMapping("/category/active/{catId}")
    public List<Quiz> getActiveQuizzesByCategory(@PathVariable("catId") Long CatId){
        Category category = new Category();
        category.setCatId(CatId);
        return this.quizService.getActiveQuizzesOfCategory(category);
    }


}
