import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private snack:MatSnackBar) { }
 
  //add user
  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user`, user);    
  }
}
