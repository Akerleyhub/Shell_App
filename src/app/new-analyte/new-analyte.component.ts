import { Component } from '@angular/core';

@Component({
  selector: 'app-new-analyte',
  templateUrl: './new-analyte.component.html',
  styleUrls: ['./new-analyte.component.css']
})
export class NewAnalyteComponent {
  id: string="";
  //status: string="";
  name:string="";
  significance:string="";
  conceptID:string="";
  keywords:string="";
  synonyms: string="";
  infect:boolean=false;
  environ:boolean=false;
  ELAP:string="";

  selected = 0;
  statuses: any[] = [
    {status_type_id: 1, description: 'PENDING'},
    {status_type_id: 2, description: 'FINAL'},
    {status_type_id: 3, description: 'READY'},
    {status_type_id: 4, description: 'MIGRATED'}
  ];
  // Is linked via ngModole so the value is linked to the variable
  checkCheckBoxvalue(e:any){
    e.value=!e.value;
  }
  submit(){
    // Getting the value from status is an arse pain
    console.log(this.statuses[this.selected-1].description, this.infect,this.environ)
  }
}
