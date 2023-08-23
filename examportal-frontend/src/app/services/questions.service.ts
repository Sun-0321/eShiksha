import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  getQuestions(quizId: any) {
    return this.http.get(`${baseUrl}/question/quiz/${quizId}`);
  }
  getAllQuestions(quizId: any) {
    return this.http.get(`${baseUrl}/question/quiz/all/${quizId}`);
  }

  postQuestion(question: any) {
    return this.http.post(`${baseUrl}/question`, question);
  }

  deleteQuestion(questionId: any) {
    console.log(questionId);

    return this.http.delete(`${baseUrl}/question/${questionId}`);
  }

  getQuestionsOfQuiz(quizId: any) {
    return this.http.get(`${baseUrl}/question/quiz/${quizId}`);
  }

  evaluateQuiz(questions: any) {
    return this.http.post(`${baseUrl}/question/evaluate-quiz`, questions);
  }
}
