import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private categoryService: CategoryService, private snack: MatSnackBar) { }

  categories: any;

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      err => {
        this.snack.open('Error in loading categories from SERVER', '', {
          duration: 3000
        });
      }

    )
  }


}
