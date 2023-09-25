import { Component } from '@angular/core';

@Component({
  selector: 'app-new-control-type',
  templateUrl: './new-control-type.component.html',
  styleUrls: ['./new-control-type.component.css']
})
export class NewControlTypeComponent {
  controlType: string="";
  name:string="";
  description:string="";

  submit(){
    console.log(this.controlType,this.name,this.description);
  }
}
