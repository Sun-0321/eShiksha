import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  defaultQuiz: any = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      catId: ''
    }
  };

  constructor(private http: HttpClient) { }
  private messageSource = new BehaviorSubject<any>(this.defaultQuiz);
  quizFromService = this.messageSource.asObservable();



  changeQuiz(quiz: any) {
    this.messageSource.next(quiz);
  }

  getQuizzes() {
    return this.http.get(`${baseUrl}/quiz`);
  }

  getQuizzesByCatId(catId: any) {
    return this.http.get(`${baseUrl}/quiz/getByCategory/${catId}`);
  }

  addQuiz(quiz: any) {
    return this.http.post(`${baseUrl}/quiz`, quiz);
  }

  deleteQuiz(quizId: number) {
    return this.http.delete(`${baseUrl}/quiz/${quizId}`);
  }

  updateQuiz(quiz: any) {
    return this.http.put(`${baseUrl}/quiz`, quiz)
  }

  getActiveQuizzes() {
    return this.http.get(`${baseUrl}/quiz/active`);
  }
  getActiveQuizzesByCategory(catId: any) {
    return this.http.get(`${baseUrl}/quiz/category/active/${catId}`);
  }

  getQuiz(quizId: any) {
    return this.http.get(`${baseUrl}/quiz/${quizId}`);
  }
}
