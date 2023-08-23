import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  constructor(private categoryService: CategoryService, public quizService: QuizService, private snack: MatSnackBar, private router: Router) { }

  categories: any = {};
  public quiz: any;
  isUpdation: boolean = false;

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

  ngOnInit(): void {
    console.log(this.isUpdation);

    this.quizService.quizFromService.subscribe((q) => {
      this.quiz = q
      if (this.quiz.title.length > 0) {
        this.isUpdation = true;
      }
      else {
        this.isUpdation = false;
      }

      console.log(this.isUpdation);

    });




    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
        console.log(data);

      },
      err => {
        console.log(err);

      }
    )
  }

  formSubmit() {
    if (this.quiz.title == '' || this.quiz.title == null) {
      this.snack.open('Title is Required', '', {
        duration: 3000,
      });
      return;
    }

    this.quiz.maxMarks = parseInt(this.quiz.maxMarks);
    this.quiz.numberOfQuestions = parseInt(this.quiz.numberOfQuestions);
    this.quiz.category.catId = parseInt(this.quiz.category.catId);

    console.log(this.quiz);




    this.quizService.addQuiz(this.quiz).subscribe(
      data => {
        console.log(data);

        this.quiz = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          publishStatus: true,
          category: {
            catId: ''
          }
        };


        if (this.isUpdation) {
          Swal.fire('Success', 'Quiz has been updated Successfully', 'success').then((e) => {
            this.router.navigate(['/admin/quizzes']);
          })
        }
        else {
          Swal.fire('Success', 'Quiz has been added Successfully', 'success').then(e => {
            this.router.navigate(['/admin/quizzes']);
          })
        }
        this.isUpdation = false;
        this.quizService.changeQuiz(this.defaultQuiz);

      },
      err => {
        console.log(err);
        this.snack.open('Failed to add Quiz, try Again!!', '', {
          duration: 3000,
        })
      }
    )


  }

}
