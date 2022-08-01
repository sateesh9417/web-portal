import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.css']
})
export class LoginOtpComponent implements OnInit {
  loginOtpForm!:FormGroup;
  submitted = false
  constructor(
    private router: Router,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginOtpForm = this.fb.group({
      mobileNo:['',[Validators.required,Validators.pattern('[6-9]{1}[0-9]{9}'), this.noWhitespaceValidator]],
      otp:['',[Validators.required,Validators.pattern('[0-9]{6}'), this.noWhitespaceValidator]]
    })
  }

  public noWhitespaceValidator(control: FormControl) {
    const pattern = /^[^\s]+(\s+[^\s]+)*$/;
    const myTestBool = pattern.test(control.value);
    const isValid = myTestBool;
    return isValid ? null : { 'whitespace': true };
}

  onLoginOtpSubmit(){
    this.submitted = true;
    this.router.navigate(['/web-portal'])
  }

  resendOtp(){
    alert('resend otp')
  }

}
