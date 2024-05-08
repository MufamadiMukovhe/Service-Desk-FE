import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent {

  
  constructor(private router:Router) {
  }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('',Validators.compose([Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
    password: new FormControl('',  [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
  });
  showSpinner: boolean = false;

  onSubmit() {
      this.showSpinner = true;
      setTimeout(() => {
          this.showSpinner = false;
      }, 5000);
  }
  get login (){return this.loginForm.controls;}
  
}
