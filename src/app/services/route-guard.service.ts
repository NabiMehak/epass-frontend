import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import jwt_decode from "jwt-decode";
import { GlobalConstants } from '../shared/global-constants';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(public auth: AuthService,
    public route : Router,
    private snackbarService:SnackbarService) { }

    canActivate(route:ActivatedRouteSnapshot): boolean{
      console.log(">>>>>>>>>>>>>>>>>>>")
      console.log(route,">>>>>>>>>>>>>>>>>>>"); 
      let expectedRoleArray = route.data;
      console.log(expectedRoleArray,">>>>>>>>>>>>>>>>>>>");
      expectedRoleArray = expectedRoleArray.expectedRole;

      const token:any = localStorage.getItem('token');
      var tokenPayload:any;

      try{
        tokenPayload = jwt_decode(token)
      }
      catch(err){
        localStorage.clear();
        this.route.navigate(['/']);
      }

      let checkRole = false;
      console.log(expectedRoleArray)

      for (let i = 0; i < expectedRoleArray.length; i++) {
       if(expectedRoleArray[i] == tokenPayload.role){
        checkRole = true;
       }
      }
      if(tokenPayload.role == 'user' || tokenPayload.role == 'admin'){
        if(this.auth.isAuthenticated() && checkRole){
          return true;
        }
        this.snackbarService.openSnackBar(GlobalConstants.nnauthorized,GlobalConstants.error);
        this.route.navigate(['/cafe/dashboard']);
        return false;
      }
      else{
        this.route.navigate(['/']);
        localStorage.clear();
        return false;
      }
    }
}
