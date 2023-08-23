import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit{
  categories:any = [];




  
  constructor(private categoryService:CategoryService){}
  
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      data=>{
        this.categories = data;
        console.log(this.categories);
        
      },
      err=>{
        throw new Error(err);
        Swal.fire("Err..,","Error in loading data",'error');
        
      }
    )
  }


}
