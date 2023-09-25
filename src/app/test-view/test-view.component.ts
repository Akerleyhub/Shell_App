import { Component } from '@angular/core';
//import { TestNode } from '../test-interface';
import { TestAPIService } from '../test-api.service';

@Component({
  selector: 'app-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.css']
})
export class TestViewComponent {
  selected:string;
  statuses: string[] = ['PENDING','FINAL','READY','MIGRATED']
  cselected:string;
  catagories:string[] = ['AIR','WATER','IDENT','NONPOP','OTHER','PCR']
  wselected:string;
  worksheets: string[] = [ 'SPREADSHEET','FORM','SEROLOGY']
  tcselected:string;
  testCounts: string[] = ['TESTCOUNT', 'REPCOUNT','NOCOUNT'];

  constructor(
    private _testService: TestAPIService
  ) {
    const chosenTest = _testService.selectedTest;
    if(chosenTest().type == 'TEST'){
      if (this.statuses.includes(chosenTest().status)) {
        this.selected = chosenTest().status;
      }
      if (this.catagories.includes(chosenTest().catagory)) {
        this.cselected = chosenTest().catagory;
      }
      if (this.worksheets.includes(chosenTest().worksheet)) {
        this.wselected = chosenTest().worksheet;
      }
      if (this.testCounts.includes(chosenTest().test_count)) {
        this.tcselected = chosenTest().test_count;
      }
      this.testFormData = {
        test_id:this.chosenTest().test_id,
        name:this.chosenTest().name,
        description:this.chosenTest().description,
        cost:this.chosenTest().cost,
        rcost:this.chosenTest().replica_cost,
        test: this.chosenTest().test_num,
        replicate:this.chosenTest().replicate,
        finalReport:this.chosenTest().final_report,
        addReplicate:this.chosenTest().replica_status,
        tg:false
      };
    }
    
  }
  chosenTest = this._testService.selectedTest;
  testFormData = {
    test_id:"",
    name:"",
    description:"",
    cost:"",
    rcost:"",
    test: "",
    replicate:"",
    finalReport:false,
    addReplicate:false,
    tg:false
  };
  testGroupFormData = {
    name: '',
    password: ''
  };
  mneuFormData = {
    name: '',
    password: ''
  };
  // Is linked via ngModole so the value is linked to the variable
  checkCheckBoxvalue(e:any){
    e.value=!e.value;
  }
  // Any updates will call the correct function below
  // We'll want to update chosenTest and reflect that update in the overall Testcall value from the service
  // This should be of type Test from interface and they should have the same Keys.
  // or else the function ---WONT WORK CORRECTLY---
  updateTest(){
    //console.log(this.testFormData);
    // Function that will tell us what has changed between the currently chosen test and the updates made to it
    function diff(obj1, obj2) {
        const result = {};
        if (Object.is(obj1, obj2)) {
            return undefined;
        }
        if (!obj2 || typeof obj2 !== 'object') {
            return obj2;
        }
        Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach(key => {
            if(obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
                result[key] = obj2[key];
            }
            if(typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
                const value = diff(obj1[key], obj2[key]);
                if (value !== undefined) {
                    result[key] = value;
                }
            }
        });
        return result;
    }
    const updateJSON = diff(this.testFormData, this.chosenTest());
    // Call some API in the service that will make db updates based off this
    console.log(updateJSON);
  }
  updateTestGroup(){
    
  }
  updateMneumonic(){
    
  }
}
