// export class LoginComponent {
//   //error = this._authService.error;
//   schemas: string[] = ['CLIMS','CLIMS_CONFIG'];
//   databases: string[] = ['PROD','QA','DEV','SANDBOX'];
  
//   selectSchema: string = "CLIMS_CONFIG"; //clims or config
//   selectDatabase: string= "PROD" //PROD/QA/DEV/SANDBOX

//   username: string = "";
//   password: string = "";

//   constructor(
//     private _authService: AuthService) {
//     // If user changes, navigate to home
//     effect(() => {
//       console.log('changing user: ', this._authService.user());
//     //   if (this._authService.user())
//     //     this._router.navigate(['/']);
//     });
//   }

//   // Function to handle the selection change event for schema
//   onSelectSchemaOption(event: Event): void {
//     const target = event.target as HTMLSelectElement;
//     this.selectSchema = target.value;
//   }
//   // Function to handle the selection change event
//   onSelectDBOption(event: Event): void {
//     const target = event.target as HTMLSelectElement;
//     this.selectDatabase = target.value;
//   }
//   login() {
//     console.log('logged in user: ', this.username,this.password)
//     //this._authService.login(this.username, this.password);
//     //this._authService.login("admin", "pass");  // Hardcode the credentials for now
//   }
// }
//----------------------------------------
import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { Component,effect } from '@angular/core';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  schemas: string[] = ['CLIMS','CLIMS_CONFIG'];
  databases: string[] = ['PROD','QA','DEV','SANDBOX'];
  
  selectedSchema: string = "CLIMS_CONFIG"; //clims or config
  selectedDatabase: string= "PROD" //PROD/QA/DEV/SANDBOX

  userArray: string[] | undefined;

  constructor (
    private _router: Router
    //     private _authService: AuthService) {
//     // If user changes, navigate to home
//     effect(() => {
//       console.log('changing user: ', this._authService.user());
//     //   if (this._authService.user())
//     //     this._router.navigate(['/']);
//     });
   ) {}

  onSubmit() {
    // Here you can add your login logic.
    // For the demo purpose, let's just display the entered credentials in the console.
    console.log('Selected DB', this.selectedDatabase);
    console.log('Selected Schema', this.selectedSchema);
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    this.userArray = [this.selectedDatabase,this.selectedSchema,this.username]

    localStorage.setItem('user', JSON.stringify(this.userArray));
    //this._router.navigate(['/']);
    window.location.href="/"
    console.log('NOW LOGGED IN');
  }
}
