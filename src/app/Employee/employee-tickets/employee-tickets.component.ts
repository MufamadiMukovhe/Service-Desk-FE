import { Component, ElementRef, HostListener, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-tickets',
  templateUrl: './employee-tickets.component.html',
  styleUrls: ['./employee-tickets.component.css']
})
export class EmployeeTicketsComponent
{

  currentMenuItem: string = 'unresolved'; // Initialize with the default active menu item
  previousMenuItem: string = ''; // Initialize with empty value
  filterForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private el: ElementRef) {
    this.filterForm = this.formBuilder.group({
      status: new FormControl(''),
      priority: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),

    });
  }

  ticketForm:FormGroup = new FormGroup({

    /*email: new FormControl('',[Validators.required,Validators.email]),
    priority_status: new FormControl ('',[Validators.required]),*/
    type: new FormControl('',[Validators.required]),
    ticketBody: new FormControl('', [Validators.required])

  })

  activeTab: string = 'tab1';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  //Toggling through the buttons
  currentForm: string = 'unresolved';

  toggleForms(form: string) {
    this.currentForm = form;
  }

  showSpinner: boolean = false;
  userAdded: boolean = false;
  successMessage: string = '';

  showSpinner2: boolean = false;

//Filtering
applyFilters() {
    this.showSpinner2 = true;
      setTimeout(() => {
        this.showSpinner2 = false;
    }, 5000);
}


  addTicket() {
    if (this.ticketForm.valid) {
      this.showSpinner = true;
  
      setTimeout(() => {
        this.showSpinner = false;
        this.successMessage = `Ticket added successfully.`;
        this.ticketForm.reset();
        
        setTimeout(() => {
          this.successMessage = ''; 
        }, 3000);
      }, 5000); 
    }
  }



//Filter toggle
  showDropdown: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const dropdownElement = document.getElementById('dropdown');
    if (dropdownElement && dropdownElement.contains(event.target as Node)) {
      return;
    }
    this.showDropdown = false;
  }
  
  stopPropagation(event: Event) {
    event.stopPropagation();
}

   //Closing the window
   closeWindow() {
    this.showDropdown=false;
  }
  get new_ticket (){return this.ticketForm.controls;}
}
