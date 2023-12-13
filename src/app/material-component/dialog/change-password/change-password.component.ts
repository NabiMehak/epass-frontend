import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePassword: any = FormGroup;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private userServices: UserService,
    private router: Router,
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.changePassword = this.formBuilder.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  validateSubmit() {
    if (
      this.changePassword.controls['newPassword'].value !=
      this.changePassword.controls['confirmPassword'].value
    ) {
      return true;
    } else {
      return false;
    }
  }

  changePasswordSubmit() {
    this.ngxService.start();
    var formData = this.changePassword.value;
    var data = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    };

    this.userServices.changePassword(data).subscribe(
      (res: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.responseMessage = res.message;
        this.snackbarService.openSnackBar(this.responseMessage, '');
      },
      (error) => {
        this.ngxService.stop();
        if (error.error.message) {
          this.responseMessage = error.error.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
}
