import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';


declare var $: any; // Declare jQuery
@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.css']
})
export class CompanySettingsComponent {
  constructor(private fb: FormBuilder) {}

  
//Change profile details form
  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl('Phumudzo ', [Validators.required, this.noNumbersValidator()]),
    lastName: new FormControl(' Tshivhase', [Validators.required, this.noNumbersValidator()]),
    email: new FormControl('Phumu98@gmail.com', [Validators.required, Validators.email]),
    dob: new FormControl(new Date(), Validators.required),
    country: new FormControl('South Sudan', Validators.required),
    });

    
  //Change Password Form

  passwordForm: FormGroup = this.fb.group({
    old_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    new_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    confirm_password: ['', [Validators.required]],
  }, { validators: this.MustMatch('new_password', 'confirm_password') });
  
//Adding a User form
  add_user_form: FormGroup = new FormGroup({
    //fullName: new FormControl('', [Validators.required, this.noNumbersValidator()]),
    firstName: new FormControl('', [Validators.required, this.noNumbersValidator()]),
    lastName: new FormControl('', [Validators.required, this.noNumbersValidator()]),
    designation: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),

    //status: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),

      

    });

  //comfirm password
  MustMatch( password:any, confirm_password:any)
  {
   return(formGroup: FormGroup)=>{
     const passwordcontrol = formGroup.controls[password];
     const confirm_passwordcontrol = formGroup.controls[confirm_password];

     if(confirm_passwordcontrol.errors && !confirm_passwordcontrol.errors['MustMatch']){
       return;
     }
     if(passwordcontrol.value !== confirm_passwordcontrol.value)
     {
       confirm_passwordcontrol.setErrors({'MustMatch': true});
     }
     else{
       confirm_passwordcontrol.setErrors(null);
     }

   }
  }
  currentForm1: string = 'form6';
     //Active and nin active content
     currentForm: string = 'form1';
  
     toggleForms(form: string) {
       this.currentForm = form;
     }

 

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

    //Save Changes spinner
    showSpinner: boolean = false;
    saveChanges() {
      this.showSpinner = true;
  
      setTimeout(() => {
        this.showSpinner = false;
      }, 5000);
    }

    //Change Password

    changePassword() {
      this.showSpinner = true;
  
      setTimeout(() => {
        this.showSpinner = false;
      }, 5000);
    }

    //Add Agent/Employee
    addUsers() {
      this.showSpinner = true;
  
      setTimeout(() => {
        this.showSpinner = false;
      }, 5000);
    }
     //Button to select

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    //console.log(selectedFile); Do something with the selected file
  }
  
  buttonTexts: string[] = ['On', 'On', 'On', 'On', 'On','On','On','On']; 
  isOns: boolean[] = [true, true, true, true, true, true, true, true]; 
  
  toggleState(index: number) {
    this.isOns[index] = !this.isOns[index];
    this.buttonTexts[index] = this.isOns[index] ? 'On' : 'Off';
  }

  //Restore to default button
  restoreToDefault() {
    this.isOns = this.isOns.map(() => false);
    this.buttonTexts = this.isOns.map(() => 'On'); 
  }


 //Deactivating
 isDropdownOpen: boolean[] = []; // Assuming there are three dropdowns
isDeactivating: boolean = false;
loading: boolean = false;
buttonText: string = 'Disable'; 
isButtonDisabled: boolean = false;


toggleDropdown(index: number) {
  this.isDropdownOpen[index] = !this.isDropdownOpen[index];

  for (let i = 0; i < this.isDropdownOpen.length; i++) {
    if (i !== index) {
      this.isDropdownOpen[i] = false;
    }
  }
}
isConfirmingDeactivation: boolean = false;



confirmDeactivation() {
  this.isConfirmingDeactivation = true;
  this.loading = true; 
  

  setTimeout(() => {
      
      this.isDeactivating = !this.isDeactivating; 
      this.loading = false;
      this.isConfirmingDeactivation = false; 

      this.closeDropdown()
      this.buttonText = 'Enable';
  }, 2000); 
}

addVisible: boolean = false;
toggleAddForms() {
  this.addVisible = !this.addVisible;
}

confirmDeactivation2() {
  this.isConfirmingDeactivation = true; 
  this.loading = true; 
  

  setTimeout(() => {
      this.isDeactivating = !this.isDeactivating; 
      this.loading = false;
      this.isConfirmingDeactivation = false; 

      this.closeDropdown();

      this.buttonText = 'Disable';
  }, 2000); 
}





closeDropdown() {
  // Close all dropdowns
  for (let i = 0; i < this.isDropdownOpen.length; i++) {
    this.isDropdownOpen[i] = false;
  }
}     

  
    get profile (){return this.profileForm.controls;}
    get password (){return this.passwordForm.controls;}
    get add (){return this.add_user_form.controls;}



}

