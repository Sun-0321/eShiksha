import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  constructor(private locationStrategy: LocationStrategy, private route: ActivatedRoute, private questionService: QuestionsService, private snack: MatSnackBar) { }

  quizId: any;
  questions: any = [];
  correctAnswers = 0;
  marksPerQuestion = 0;
  totalMarks = 0;
  attempted = 0;
  isSubmitted: boolean = false;

  timer: any;

  ngOnInit(): void {
    // this.preventBackButton();
    this.quizId = this.route.snapshot.params['quizId'];
    this.questionService.getQuestionsOfQuiz(this.quizId).subscribe(
      data => {
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;


        if (this.questions.length > 0) {
          this.startTimer();
        }
        console.log(this.questions);
        console.log("sec: " + this.timer);


      },
      err => {
        console.log(err);
        Swal.fire('Error', 'Issue with the Server', 'error');
      }
    )


  }

  preventBackButton() {
    history.pushState(null, 'null', location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, 'null', location.href);
    })

  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Submit',
      icon: 'info'
    }).then((e: any) => {
      if (e.isConfirmed) {
        this.generateReport();
      }
    })


  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer == 0) {
        this.generateReport();
        clearInterval(t);
        this.snack.open('Test has ended Automatically', '', {
          duration: 5000
        });

      }
      else {
        this.timer--;
      }
    }, 1000);
  }

  getTimeFormatted() {
    let hrs: any = Math.floor(this.timer / 3600);
    let mins: any = Math.floor((this.timer % 3600) / 60);
    let secs: any = this.timer % 60;

    if (mins < 10) {
      mins = '0' + mins;
    }
    if (hrs < 10)
      hrs = '0' + hrs;
    if (secs < 10) {
      secs = '0' + secs;
    }

    if (hrs == '00' && mins == '00') {
      return `${hrs} : ${mins} : ${secs} Sec`;
    }
    else if (hrs == '00') {
      return `${hrs} : ${mins} : ${secs} Mins`;
    }
    else {
      return `${hrs} : ${mins} : ${secs} Hrs`;
    }
  }

  generateReport() {

    this.correctAnswers = 0;
    this.totalMarks = 0;
    this.attempted = 0;
    console.log("printing questions");

    this.isSubmitted = true;
    console.log(this.questions);

    this.questionService.evaluateQuiz(this.questions).subscribe(
      (data: any) => {
        console.log(data);
        this.correctAnswers = data.correctAnswers;
        this.totalMarks = data.totalMarks;
        this.attempted = data.attempted;
      },
      err => {
        console.log(err);
      }
    )
  }


}
