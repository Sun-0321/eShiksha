import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-instructions',
  templateUrl: './quiz-instructions.component.html',
  styleUrls: ['./quiz-instructions.component.css']
})
export class QuizInstructionsComponent implements OnInit {
  quizId: any;
  quiz: any;
  marksPerQuestion: any;
  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params['quizId'];
    console.log(this.quizId);

    this.quizService.getQuiz(this.quizId).subscribe(
      data => {
        this.quiz = data;
        this.marksPerQuestion = Math.round(this.quiz.maxMarks / this.quiz.numberOfQuestions);
      },
      err => {
        console.log(err);
      }
    )

  }

  startQuiz() {
    Swal.fire({
      icon: 'info',
      title: 'Do you want to start the Quiz?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/start/' + this.quizId]);

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }


}
