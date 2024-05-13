import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; // Import Validators
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent {
  alertType!: string;
  alertMessage!: string;
  showAlert!: boolean;

  // Inject Router service if needed
  constructor(private router: Router) { }

  // Form initialization
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('',Validators.compose([Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
    password: new FormControl('',  [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
  });

  // Getter for form controls
  get login (){return this.loginForm.controls;}

  // Spinner flag
  showSpinner: boolean = false;

  // Sign-in method
  signIn() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 5000);
  }
}
