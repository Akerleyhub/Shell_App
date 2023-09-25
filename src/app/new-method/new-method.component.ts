import { Component } from '@angular/core';

@Component({
  selector: 'app-new-method',
  templateUrl: './new-method.component.html',
  styleUrls: ['./new-method.component.css']
})
export class NewMethodComponent {
  id: string="";
  name:string="";
  concept:string="";

  submit(){
    console.log(this.id,this.name,this.concept)
  }
}
