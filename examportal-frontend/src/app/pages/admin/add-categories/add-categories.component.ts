import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent {

  constructor(private categoryService: CategoryService, private snack: MatSnackBar, private router: Router) { }

  category: any = {
    title: '',
    description: ''
  };

  addNewCategory() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this.snack.open('Title is Required!!', '', {
        duration: 3000
      });
      return;
    }
    this.categoryService.addCategory(this.category).subscribe(
      data => {
        console.log(data);
        this.snack.open('Category is successfully Added', '', {
          duration: 3000
        });
        this.category = {};
        this.router.navigate(['/admin/categories'])
      },
      err => {
        console.log(err);
        Swal.fire('Error..', 'Server Error', 'error')

      }
    )
  }
}
