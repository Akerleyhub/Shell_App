import { Component } from '@angular/core';

@Component({
  selector: 'app-new-supply-controltype',
  templateUrl: './new-supply-controltype.component.html',
  styleUrls: ['./new-supply-controltype.component.css']
})
export class NewSupplyControltypeComponent {
  id:string="";

  submit(){
    console.log(this.id)
  }
}
