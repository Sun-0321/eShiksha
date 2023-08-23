package com.exam.examportal.controller;

import com.exam.examportal.dao.QuestionRepository;
import com.exam.examportal.model.exam.Question;
import com.exam.examportal.model.exam.Quiz;
import com.exam.examportal.service.QuestionService;
import com.exam.examportal.service.QuizService;
import com.exam.examportal.service.impl.QuestionServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.*;

@RestController
@RequestMapping("question")
@CrossOrigin("*")
public class QuestionController {

    @Autowired
    private QuestionServiceImpl questionService;

    @Autowired
    private QuizService quizService;

    @GetMapping("")
    public Set<Question> getQuestions(){
        return questionService.getQuestions();
    }

    @GetMapping("/{id}")
    public Question getQuestion(@PathVariable("id") Long id){
        return questionService.getQuestion(id);
    }

    @PostMapping("")
    public Question addQuestion(@RequestBody Question question){
        return questionService.addQuestion(question);
    }

    @PutMapping("")
    public Question updateQuestion(@RequestBody Question question){
        return questionService.updateQuestion(question);
    }

    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable("id") Long id){
        this.questionService.deleteQuestion(id);
    }

    //get all questions of any quizId
    @GetMapping("/quiz/{id}")
    public ResponseEntity<?> getQuestionsByQuiz(@PathVariable("id") Long id){
//        Set<Question> questionsOfQuiz = questionService.getQuestionsOfQuiz(quiz);

        Quiz quiz = quizService.getQuiz(id);
        Integer numberOfQuestions = quiz.getNumberOfQuestions();

        Set<Question> questions = quiz.getQuestions();
        List list = new ArrayList(questions);
        if(list.size()>numberOfQuestions){
            list = list.subList(0,numberOfQuestions);
        }

        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/quiz/all/{id}")
    public ResponseEntity<?> getAllQuestionsByQuiz(@PathVariable("id") Long id){
//        Set<Question> questionsOfQuiz = questionService.getQuestionsOfQuiz(quiz);

        Quiz quiz = quizService.getQuiz(id);
        Set<Question> questions = quiz.getQuestions();
        List list = new ArrayList(questions);
//        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }

    @PostMapping("evaluate-quiz")
    public ResponseEntity<?> evaluateQuiz(@RequestBody List<Question> questions){
         Integer correctAnswers = 0;
         double marksPerQuestion = (1.00 * questions.get(0).getQuiz().getMaxMarks()) / questions.size();
         double totalMarks = 0;
         Integer attempted = 0;
         for(Question q:questions)
         {
            Question question = this.questionService.getQuestion(q.getQuestionId());
            if(q.getChosenOption()!=null && question.getAnswer().trim().equals(q.getChosenOption().trim())){
                correctAnswers++;
            }
            if(q.getChosenOption()!=null && !q.getChosenOption().trim().equals("")){
                attempted++;
            }
        };
         totalMarks = correctAnswers * marksPerQuestion;
         Map<String,Object> ret = Map.of("totalMarks",totalMarks,"correctAnswers",correctAnswers,"attempted",attempted);
         return  ResponseEntity.ok(ret);
    }
}
