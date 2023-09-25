import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shell';
  // Get list of labs from a service, for now hardcode
  //labs:string[]=['BACT','MYCOBACT','VRS','RIL','MYCOLOGY'];
  //selectedLab: string = ''; // Holds the selected option from the dropdown
  isLoggedIn: any; //ideally a bool but login data will prob be an object or string
  //currLab: any;
  constructor(){
    this.isLoggedIn = localStorage.getItem('user');
    //this.currLab= localStorage.getItem('selectedLab');
  }
}