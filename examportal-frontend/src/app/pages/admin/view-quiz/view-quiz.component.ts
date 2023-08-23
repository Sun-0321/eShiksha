import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent implements OnInit {

  constructor(public quizService: QuizService, private snack: MatSnackBar, private router: Router) { }

  quiz: any = [];

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe(
      data => {
        this.quiz = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    )
  }

  delete(quizId: number) {
    console.log(quizId);
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
      showCloseButton: true,
    }).then(res => {
      if (res.isConfirmed) {
        this.quizService.deleteQuiz(quizId).subscribe(
          data => {
            this.snack.open('Deleted Successfully', '', {
              duration: 3000,
              panelClass: 'center',
            })
            this.quiz = this.quiz.filter((q: any) => {
              return q.quizId != quizId
            });
          },
          err => {
            console.log(err);

          }
        )
      }
    })
      .catch(err => {
        console.log(err);
      })
  }

  updateBtn(quizForm: any) {
    // quizForm = JSON.stringify(quizForm);

    this.quizService.changeQuiz(quizForm);
    this.quizService.quizFromService.subscribe((q) => {
      console.log(q);
    });

    this.router.navigate(['/admin/add-quiz']);

  }

}
