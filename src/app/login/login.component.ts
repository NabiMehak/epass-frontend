import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:any = FormGroup;
  responseMessage:any;

  constructor(
    private formBuilder: FormBuilder,
    private userServices: UserService,
    private router: Router,
    private snackbarService: SnackbarService,
    private dialogRef : MatDialogRef<LoginComponent>,
    private ngxService : NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({  
      email:[null,[Validators.required]],      
      password:[null,[Validators.required]],   
    });
  }

  submit(){
    this.ngxService.start();
    var formData = this.loginForm.value;
    var data = {   
      email:formData.email,      
      password:formData.password,   
    }

    this.userServices.signIn(data).subscribe((res:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      localStorage.setItem('token',res.token);
      this.router.navigate(['/cafe/dashboard']);
    },(error) => {
      this.ngxService.stop();
      if(error.error.message){
        this.responseMessage = error.error.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

}
