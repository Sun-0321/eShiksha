import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-show-quiz',
  templateUrl: './show-quiz.component.html',
  styleUrls: ['./show-quiz.component.css']
})
export class ShowQuizComponent implements OnInit {
  constructor(private route: ActivatedRoute, private quizService: QuizService, private snack: MatSnackBar) { }

  catId: any;
  quizzes: any = [];

  ngOnInit(): void {
    // this.catId = this.route.snapshot.params['catId'];
    console.log(this.catId);

    this.route.params.subscribe(
      (data: any) => {

        this.catId = data.catId;
        console.log(this.catId);
        if (this.catId == 0) {
          this.quizService.getActiveQuizzes().subscribe(
            data => {
              this.quizzes = data;
            },
            err => {
              this.snack.open('Error in the Server', '', {
                duration: 3000
              });
            }
          )
        }
        else {
          this.quizService.getActiveQuizzesByCategory(this.catId).subscribe(
            data => {
              this.quizzes = data;
            },
            err => {
              this.snack.open('Issue with the Server', '', {
                duration: 3000
              });
            }
          )
        }
      }
    )
  }


}
