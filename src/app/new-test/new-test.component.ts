import { Component } from '@angular/core';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.css']
})
export class NewTestComponent {
  id: string="";
  name:string="";
  description:string="";
  cost:string="";
  rcost:string="";
  test: string="";
  replicate:string="";
  finalReport:boolean=false;
  addReplicate:boolean=false;
  tg:boolean=false;


  selected = 0;
  statuses: any[] = [
    {status_type_id: 1, description: 'PENDING'},
    {status_type_id: 2, description: 'FINAL'},
    {status_type_id: 3, description: 'READY'},
    {status_type_id: 4, description: 'MIGRATED'}
  ];
  cselected = 0;
  catagories: any[] = [
    {catagory_id: 1, description: 'AIR'}, //Air Emissions
    {catagory_id: 2, description: 'WATER'}, //Water
    {catagory_id: 3, description: 'IDENT'}, //Identification
    {catagory_id: 4, description: 'NONPOP'}, //Non-Potable Water
    {catagory_id: 5, description: 'OTHER'}, //Other
    {catagory_id: 4, description: 'PCR'}, //PCR
  ];
  wselected = 0;
  worksheets: any[] = [
    {worksheet_id: 1, description: 'SPREADSHEET'},
    {worksheet_id: 2, description: 'FORM'},
    {worksheet_id: 3, description: 'SEROLOGY'}, 

  ];
  tcselected = 0;
  testCounts: any[] = [
    {testCount_id: 1, description: 'TESTCOUNT'}, //Count the test
    {testCount_id: 2, description: 'REPCOUNT'}, //Count the replicates
    {testCount_id: 3, description: 'NOCOUNT'}, //Do not count
  ];
  // Is linked via ngModole so the value is linked to the variable
  checkCheckBoxvalue(e:any){
    e.value=!e.value;
  }
  // Extract the json string, convert it to object and set values
  pasteBuffer(){
    const json = localStorage.getItem('copiedTest');
    if(!json) return;
    const testObj = JSON.parse(json);
    //console.log(testObj)
    this.id = testObj.test_id;
    this.name =testObj.name;
    this.description = testObj.description;
    this.cost = testObj.cost;
    this.rcost =testObj.rcost;
    this.test = testObj.test;
    this.replicate = testObj.replicate;
    //this.finalReport= 
    //this.addReplicate=
    //this.tg=
  }
  submit(){
    // Getting the value from status is an arse pain
    console.log(this.statuses[this.selected-1].description)
  }
}
