import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public editor = ClassicEditor;
  constructor(private route: ActivatedRoute, private questionService: QuestionsService, private snack: MatSnackBar, private router: Router) { }

  quizId: any;
  quizTitle: any;
  question: any = {
    "content": '',
    "image": "Default.jpg",
    "options": [
      "",
      "",
      "",
      ""
    ],
    "answer": "",
    "quiz": {
      "quizId": ''
    }
  };
  options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  correctOption: any = new FormControl('');

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params['id'];
    this.quizTitle = this.route.snapshot.params['title'];
    console.log(this.quizId);
    this.question.quiz.quizId = this.quizId;
  }
  formSubmit() {

    if (this.question.content.trim() == '' || this.question.content == null) {
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      return;
    }

    this.questionService.postQuestion(this.question).subscribe(
      data => {
        console.log(data);

        this.snack.open('Question has been added Successfully!!', '', {
          duration: 3000
        });
        this.router.navigate(['/admin/view-questions/', this.quizId, this.quizTitle]);
      },
      err => {
        console.log(err);
        Swal.fire('Error..', 'Issue with the Serve, Try again!!', 'error');
      }
    )
  }

}
