import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private questionService: QuestionsService, private snack: MatSnackBar) { }

  quizId: any;
  quizTitle: any;
  questions: any;

  ngOnInit(): void {
    console.log(this.route.snapshot.params);

    this.quizId = this.route.snapshot.params['id'];
    this.quizTitle = this.route.snapshot.params['title'];
    console.log(this.quizId);
    console.log(this.quizTitle);

    this.questionService.getAllQuestions(this.quizId).subscribe(
      data => {
        this.questions = data;
        console.log(this.questions);
      },
      err => {
        console.log(err);
      }
    );

  }

  delete(questionId: any) {
    console.log(questionId);
    
    Swal.fire({
      icon: 'info',
      title: 'Are you Sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
      showCloseButton: true,
    }).then(res => {
      if (res.isConfirmed) {
        this.questionService.deleteQuestion(questionId).subscribe(
          data => {
            this.snack.open('Deleted Successfully', '', {
              duration: 3000,
              panelClass: 'center',
            });
            this.questions = this.questions.filter((q: any) => {
              return q.questionId != questionId
            });
          },
          err => {
            console.log(err);
            this.snack.open('Error in deleting','',{
              duration:3000
            });
          }
        )
      }
    }).catch(err => {
      console.log(err);

    })

    

  }
  updateBtn(question:any){

  }



}
