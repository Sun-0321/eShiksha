import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();
  
  constructor(private http: HttpClient) { }

  //generate token when user hits login
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //current user who is logged in
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //storing token in localStorage - browser
  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  //logged user?
  public isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == undefined || token == '' || token == null) {
      return false;
    }
    else return true;
  }

  //logout: have to remove token from localStorage

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }
  //get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //get User 
  public getUser() {
    let user = localStorage.getItem('user');
    if (user == null) {
      this.logout();
      return null;
    }
    else {
      return JSON.parse(user);
    }
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
  
}
