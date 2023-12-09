import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm:any = FormGroup;
  responseMessage:any;

  constructor(
    private formBuilder: FormBuilder,
    private userServices: UserService,
    private router: Router,
    private snackbarService: SnackbarService,
    private dialogRef : MatDialogRef<SignupComponent>,
    private ngxService : NgxUiLoaderService

  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:[null,[Validators.required]],   
      email:[null,[Validators.required]],   
      contactNumber:[null,[Validators.required]],   
      password:[null,[Validators.required]],   
    });
  }

  save(){
    this.ngxService.start();
    var formData = this.signupForm.value;
    var data = {
      name:formData.name,   
      email:formData.email,   
      contactNumber:formData.contactNumber,   
      password:formData.password,   
    }

    this.userServices.signUp(data).subscribe((res:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = res.message;
      this.snackbarService.openSnackBar(this.responseMessage,"");
      this.router.navigate(['/']);
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
