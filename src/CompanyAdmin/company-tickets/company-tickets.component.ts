import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-tickets',
  templateUrl: './company-tickets.component.html',
  styleUrls: ['./company-tickets.component.css']
})
export class CompanyTicketsComponent {

  ticketForm:FormGroup = new FormGroup({
    assignee: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    type: new FormControl('',[Validators.required]),
    priority_status: new FormControl ('',[Validators.required]),
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
  //Filter toggle
  showDropdown: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
}
  applyFilters() {
    this.showDropdown=false
  }
  
  get new_ticket (){return this.ticketForm.controls;}



}
