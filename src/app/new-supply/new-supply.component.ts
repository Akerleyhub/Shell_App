import { Component } from '@angular/core';

@Component({
  selector: 'app-new-supply',
  templateUrl: './new-supply.component.html',
  styleUrls: ['./new-supply.component.css']
})
export class NewSupplyComponent {
  partNum:string="";
  name:string="";
  description:string="";
  test:string="";
  numOfTests:number=0;

  submit(){
    console.log(this.partNum,this.name,this.description,this.test,this.numOfTests)
  }
}
