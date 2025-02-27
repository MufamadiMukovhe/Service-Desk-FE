import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-employee',
  templateUrl: './user-employee.component.html',
  styleUrls: ['./user-employee.component.css']
})
export class UserEmployeeComponent {
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  defaultDesignation = 'Select Designation';
  
//Adding a User form
add_user_form: FormGroup = new FormGroup({
  //fullName: new FormControl('', [Validators.required, this.noNumbersValidator()]),
  firstName: new FormControl('', [Validators.required, this.noNumbersValidator()]),
  lastName: new FormControl('', [Validators.required, this.noNumbersValidator()]),
  designation: new FormControl('',[Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email]),
  phone_number: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),

  //status: new FormControl('', Validators.required),
  department: new FormControl('', Validators.required),
  });

  
  //Validating Agents number

validateNumber(control: AbstractControl): ValidationErrors | null {
  if (isNaN(control.value)) {
    return { 'notANumber': true };
  }
  return null;
}
  
     //Validating if the Full Name contains numbers
  
     noNumbersValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const fullNameRegex = /^[a-zA-Z\s]*$/;
    
        if (control.value && !fullNameRegex.test(control.value)) {
          return { containsNumbers: true };
        }
        return null;
      };
    }
  
  //Adding a user/Employee
  
  showSpinner: boolean = false;
  userAdded: boolean = false;
  successMessage: string = '';

  // Your form initialization and other existing code...

  saveChanges() {
    if (this.add_user_form.valid) {
      this.showSpinner = true;
  
      setTimeout(() => {
        this.showSpinner = false;
        const firstName = this.add_user_form.get('firstName')?.value;
        const lastName = this.add_user_form.get('lastName')?.value;
        const designation = this.add_user_form.get('designation')?.value;
  
        let successMessage = '';
        if (designation === 'Agent') {
          successMessage = `Agent "${firstName} ${lastName}" successfully added.`;
        } else {
          successMessage = `Employee "${firstName} ${lastName}" successfully added.`;
        }
  
        this.successMessage = successMessage;
        this.add_user_form.reset();
  
        setTimeout(() => {
          this.successMessage = ''; // Clear the success message after 3 seconds
        }, 3000);
      }, 5000);
    }
  }
  
  

  //Closing the window
  closeWindow() {
    this.close.emit();
  }
  


  get add (){return this.add_user_form.controls;}

}
