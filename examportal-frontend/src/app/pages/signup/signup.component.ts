import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private userService: UserService, private snack: MatSnackBar, private router:Router) { }

  public user: any = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  formSubmit() {
    console.log(this.user);
    if (this.user.username == null || this.user.username == '') {
      this.snack.open("Username is required", "Ok", {
        duration: 3000
      });
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (res: any) => {
        console.log(res);
        Swal.fire(
          'Success',
          'Registered Successfully!!',
          'success'
        );
      },
      (err: any) => {
        console.log(err);
        Swal.fire(
          'Error',
          'User is already registered. Try to login!!',
          'error'
        );
      }
    );
  }

  clearForm() {

    this.user = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };
  }
}
