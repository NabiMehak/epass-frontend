import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.apiUrl;

  constructor(private route:Router) { }

 public isAuthenticated(): boolean {
  console.log(">>>>>>>>>>>>>>>>>>>")
  const token = localStorage.getItem('token');
  if(!token){
    this.route.navigate(['/']);
    return false;
  }else{
    return true;
  }
 }
}
