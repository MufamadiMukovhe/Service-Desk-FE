import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-employee-top-menu',
  templateUrl: './employee-top-menu.component.html',
  styleUrls: ['./employee-top-menu.component.css']
})
export class EmployeeTopMenuComponent {
  
  showDropdown: boolean = false;
  lastName: string='';
  expiredToken: any;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  notificationVisible = false;
  message = "Notification Message";

  toggleNotification() {
    this.notificationVisible = !this.notificationVisible;
  }
  authToken!: any;
  token!: any;
  sub!: string;
email:string='';
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.authToken = sessionStorage.getItem('auth-user');
    if (this.authToken) {
      this.token = jwt_decode(this.authToken);
      this.extractName();
      this.extractEmail();
      this.extractExpTokenTime();
    }
  }

  private extractName() {
    if (this.token && this.token.hasOwnProperty('lastname')) {
      this.lastName = this.token.lastname;
    } else {
      // Handle error or default value if company name is not present in the token
      this.sub = 'Default Company Name';
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
  
  private extractExpTokenTime() {
    if (this.token && this.token.hasOwnProperty('exp')) {
      const expTimestamp = this.token.exp * 1000; // Convert UNIX timestamp to milliseconds
      const expDate = new Date(expTimestamp);
      const currentTime = new Date();
      const timeUntilExpiry = expDate.getTime() - currentTime.getTime();
      console.log(expTimestamp);
      console.log(currentTime);
      console.log(timeUntilExpiry);
      // Set up a timer to logout when the token expires
      setTimeout(() => {
        this.logout(); // Call logout function when token expires
      }, timeUntilExpiry);
    } else {
      // Handle error or default value if exp is not present in the token
      this.expiredToken = 'Default Token';
    }
  }
 logout():void{

  this.http.post<any>('http://localhost:8080/api/company/logout/'+this.email, {}).subscribe(response => {
    // Handle logout success
    console.log('Logged out successfully');
  }, error => {
    // Handle logout error
    console.error('Error logging out:', error);
  });
  sessionStorage.clear();
}


}


