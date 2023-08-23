import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService: LoginService, private snack: MatSnackBar, private router: Router) { }

  public user = {
    username: '',
    password: ''
  };
  formSubmit() {
    if (this.user.username == null || this.user.username.trim() == '') {
      this.snack.open("Username is required!!", '', {
        duration: 3000
      });
      return;
    }
    if (this.user.password == null || this.user.password.trim() == '') {
      this.snack.open("Password is required!!", '', {
        duration: 3000
      });
      return;
    }
    console.log(this.user);

    this.loginService.generateToken(this.user).subscribe(
      (res: any) => {
        console.log(res);

        this.loginService.loginUser(res.token);


        this.loginService.getCurrentUser().subscribe(
          (user: any) => {
            console.log("here");

            this.loginService.setUser(user);
            console.log(user);

            //redirect-> ADMIN: admin-dashboard
            //NORMAL: normal-dashboard
            if (this.loginService.getUserRole() == 'ADMIN') {
              this.router.navigate(['admin']);
              this.loginService.loginStatusSubject.next(true);
            }
            else if (this.loginService.getUserRole() == 'NORMAL') {
              this.router.navigate(['user-dashboard']);
              this.loginService.loginStatusSubject.next(true);
            }
            else {
              this.loginService.logout();
            }
          },
          err => {
            console.error(err);
          }
        );
      },
      err => {
        console.log("Error");
        this.snack.open('Invalid Credentials!! Try again', '', {
          duration: 3000
        });
        console.error(err);

      }

    );

  }
}
