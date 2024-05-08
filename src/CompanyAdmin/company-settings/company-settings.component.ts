<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
=======
import { Component, OnInit, HostListener, ElementRef  } from '@angular/core';
>>>>>>> 5b99026682f8dfc00bc51cd28ec78c43cf119e7d
import { FormControl, FormGroup, Validators,FormBuilder, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utility/services/auth.service';
import jwt_decode from 'jwt-decode';

interface UserRegistrationData {
  fullName: string;
  email: string;
  contactNumber: string;
  lastName: string;
  position: string;
  role: string;
}
declare var $: any; // Declare jQuery
@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.css']
})
export class CompanySettingsComponent {

  companyId: string="";
  apiUrl:string ="";
  agents: any[] = []; // Define the agents array to hold the data
  loadings = true; // Flag to track loading state
 
  email:string="";
  newPassword: string = '';
  error!: string;
  alertType!: string;
  alertMessage!: string;
  showAlert!: boolean;
  submittingForm: boolean = false;
  users: any;
  failedAccounts: any;
 
  oldPassword: string = '';
  
  
  constructor(private fb: FormBuilder,private http: HttpClient, private formBuilder: FormBuilder,
    private authService: AuthService) {}

    ngOnInit(): void {
      this.authToken = sessionStorage.getItem('auth-user');
      if (this.authToken) {
        this.token = jwt_decode(this.authToken);
        this.extractCompanyId(); // Call the method to extract companyId
        this.extractEmail(); // Call the method to extract email
      }
      this.getAllAgents();
    }
    private extractCompanyId() {
      if (this.token && this.token.hasOwnProperty('companyId')) {
        this.companyId = this.token.companyId;
      
      } else {
        // Handle error or default value if companyId is not present in the token
        this.companyId = 'Default Company ID';
      }
    
    }
    private extractEmail() {
      if (this.token && this.token.hasOwnProperty('email')) {
        this.email = this.token.email;
      } else {
        // Handle error or default value if email is not present in the token
        this.email = 'Default Email';
      }
    }
  
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
      email: [this.email, [Validators.email]],
      old_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      new_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      confirm_password: ['', [Validators.required]],
    }, { validators: this.MustMatch('new_password', 'confirm_password') });
  
//Adding a User form
  add_user_form: FormGroup[] = [new FormGroup({
    //fullName: new FormControl('', [Validators.required, this.noNumbersValidator()]),
    firstName: new FormControl('', [Validators.required, this.noNumbersValidator()]),
    lastName: new FormControl('', [Validators.required, this.noNumbersValidator()]),
    designation: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),

    //status: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),

      

    })];

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

<<<<<<< HEAD
=======
//Closing the form if the user press at any other part of the page
@HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
    if (!target.closest('.addButton') && !target.closest('app-user-employee')) {
      this.addVisible = false;
    }
  }

>>>>>>> 5b99026682f8dfc00bc51cd28ec78c43cf119e7d
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
    get add (){return this.add_user_form[0].controls;}

    authToken!: any;
    token!: any;
    companyName!: string;
   
  
    getAllAgents() {
      this.http.get<any[]>('http://localhost:8080/api/users/get-agents/'+this.companyId).subscribe(
        (data) => {
          this.agents = data;
          this.loadings = false; // Set loading to false once data is fetched

          console.log(this.agents)
        },
        (error) => {
          console.error('Error fetching agents:', error);
          this.loadings = false; // Set loading to false on error as well
        }
      );
    }

    resetPassword() {

      this.submittingForm = true; // Set submittingForm flag to true
      // Get the value of the oldpassword field from the form
   const oldPasswordValue = this.passwordForm.get('old_password')?.value;
     this.authService.verifyOldPassword(this.email, oldPasswordValue)
       .subscribe(
         (response) => {
           console.log(this.email)
           console.log(this.oldPassword)
           this.changePassword();
 
         },
         (error) => {
           console.error('Error verifying old password:', error);
           console.log(this.email)
           console.log(this.oldPassword)
           this.error = 'Old password is incorrect.';
           this.showAlertMessage('error', 'Old password is incorrect.');
         }
       ).add(() => {
        this.submittingForm = false; // Set submittingForm flag to false when request completes
      });;
   }
 
   changePassword() {
    this.submittingForm = true; // Set submittingForm flag to true
     const PasswordValue = this.passwordForm.get('new_password')?.value;
     this.authService.changePassword(this.email, PasswordValue)
       .subscribe(
         (response: any) => {
           
           console.log('Password changed successfully:', response);
           this.showAlertMessage('success', 'Password changed successfully');
           this.profileForm.reset();
         },
         (error: any) => {
           console.error('Error changing password:', error);
           this.error = 'Error changing password. Please try again later.';
           this.showAlertMessage('error', 'Error changing password. Please try again later.');
         }
       ).add(() => {
        this.submittingForm = false; // Set submittingForm flag to false when request completes
      });;
   }
    

  

   showAlertMessage(type: string, message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }

}

