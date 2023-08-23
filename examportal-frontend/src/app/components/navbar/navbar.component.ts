import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public loginService: LoginService) { }

  isLoggedIn = false;
  user:any = null;

  ngOnInit(): void {
    this.loginService.loginStatusSubject.asObservable().subscribe(
      res=>{
        console.log(res);        
        this.isLoggedIn = this.loginService.isLoggedIn();
        this.user = this.loginService.getUser();
      }
    )
    console.log(this.isLoggedIn);
    console.log(this.user);
    
  }

  logout() {
    this.loginService.logout();
    this.loginService.loginStatusSubject.next(false);    
    window.location.reload();
  }

}
