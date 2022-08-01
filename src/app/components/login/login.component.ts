import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginForm!:FormGroup;
   submitted = false
  constructor(
    private router: Router,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      mobileNo:['',[Validators.required,Validators.pattern('[6-9]{1}[0-9]{9}'), this.noWhitespaceValidator]]
    })
  }

  public noWhitespaceValidator(control: FormControl) {
    const pattern = /^[^\s]+(\s+[^\s]+)*$/;
    const myTestBool = pattern.test(control.value);
    const isValid = myTestBool;
    return isValid ? null : { 'whitespace': true };
}

  onLoginSubmit(){
    this.submitted = true;
    this.router.navigate(['/login-otp'])
  }

}
