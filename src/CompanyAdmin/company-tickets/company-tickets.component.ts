import { Component, HostListener, EventEmitter, Input, Output} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-tickets',
  templateUrl: './company-tickets.component.html',
  styleUrls: ['./company-tickets.component.css']
})
export class CompanyTicketsComponent {

  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  ticketForm:FormGroup = new FormGroup({
    assignee: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    type: new FormControl('',[Validators.required]),
    ticketBody: new FormControl('', [Validators.required])

  })

  activeTab: string = 'tab1';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  //Toggling through the buttons
  currentForm: string = 'opened';

  toggleForms(form: string) {
    this.currentForm = form;
  }
  //Filter toggle
  showDropdown: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  /*
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const dropdownElement = document.getElementById('dropdown');
    if (dropdownElement && dropdownElement.contains(event.target as Node)) {
      return;
    }
    this.showDropdown = false;
  }*/
  stopPropagation(event: Event) {
    event.stopPropagation();
}

  startDate: Date = new Date();
  endDate: Date = new Date();

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

  //Adding a ticket
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

    //Closing the window
    closeWindow() {
      this.showDropdown=false;
    }
  
  get new_ticket (){return this.ticketForm.controls;}



}
