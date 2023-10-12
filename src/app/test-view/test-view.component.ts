import { Component,effect } from '@angular/core';
//import { TestNode } from '../test-interface';
import { TestAPIService } from '../test-api.service';
//import * as confetti from 'canvas-confetti'; funny but need a package installed

@Component({
  selector: 'app-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.css']
})
export class TestViewComponent {
  // All the dropdowns
  //TESTS
  selected:string;
  statuses: string[] = ['PENDING','FINAL','READY','MIGRATED'];
  cselected:string;
  catagories:string[] = ['AIR','WATER','IDENT','NONPOP','OTHER','PCR'];
  wselected:string;
  worksheets: string[] = [ 'SPREADSHEET','FORM','SEROLOGY'];
  tcselected:string;
  testCounts: string[] = ['TESTCOUNT', 'REPCOUNT','NOCOUNT'];
  //MNEUMONICS
  typeselected:string;
  dataTypes:string[] = ["STRING","BOOLEAN", "NUMERIC", "SPECIAL"];
  analyteselected:string;
  analytes:string[] = ["GUH","ZUG", "FLU", "GLU","MEH","GRE","LABL"]; //get from API
  picklistselected:string;
  picklists:string[] = ["POSNEG", "NUMBERVALUES","SOMETHIN"];

  constructor(
    private _testService: TestAPIService
  ) {
    const chosenTest = _testService.selected;
    // This logic needs to be in an effect so it updates any time a different test is selected
    // Does this need to be destoryed? I dont think so.
    effect(() => {
      //console.log(`The test is ${this.chosenTest()})`);
      if(chosenTest().type == 'TEST'){
        // Need to do special selection for dropdowns
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
      //-----------------------------------------------------------------------------------------------------
      if(chosenTest().type == 'MNEUMONIC'){
        if (this.dataTypes.includes(chosenTest().value_data_type)) {
          this.typeselected = chosenTest().value_data_type;
        }
        if (this.analytes.includes(chosenTest().analyte)) {
          this.analyteselected = chosenTest().analyte;
        }
        if (this.picklists.includes(chosenTest().picklist_id)) {
          this.picklistselected = chosenTest().picklist_id;
        }
        // if (this.worksheets.includes(chosenTest().worksheet)) {
        //   this.wselected = chosenTest().worksheet;
        // }
        // if (this.testCounts.includes(chosenTest().test_count)) {
        //   this.tcselected = chosenTest().test_count;
        // }
        this.mneuFormData = {
          mneu_id: chosenTest().mneu_id,
          name: chosenTest().name,
          description: chosenTest().description,
          context: chosenTest().context, // Test,Test Instance, Test Replica
          value_data_type: chosenTest().value_data_type,
          analyte:chosenTest().analyte,
          picklist_id:chosenTest().picklist_id,
          organism_mod:chosenTest().organism_mod,
          default_val:chosenTest().default_val,
          numeric_scale:chosenTest().numeric_scale,
          default_unit_id:chosenTest().default_unit_id,
          required:chosenTest().required,
          reportable:chosenTest().reportable,
          scientific_notation:chosenTest().scientific_notation,
          value_array_size_is_variable:chosenTest().value_array_size_is_variable,
          use_for_counts:chosenTest().use_for_counts,
          default_value_array_size:chosenTest().default_value_array_size,
          abnormal_result:chosenTest().abnormal_result
        };
      }
    });
  }
  chosenTest = this._testService.selected;
  
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
    testgroup_id: "",
    name: "",
    description: "",
    type: "", //This was defined by me
    status: "",
    cost: "",
    analyte:"",
    loinc_num:0,
    final_report:false,
    allow_more_tests:false,
    used_accessioning:false,
    associate_with_tg:"",
    num_of_approvals:0,
    tg_sequence:0,
    worksheet:"",
    col_order:"",
    use_for_counts:false,
  };
  mneuFormData = {
    mneu_id: "",
    name: "",
    description: "",
    context: "", // Test,Test Instance, Test Replica
    value_data_type: "",
    analyte:"",
    picklist_id:"",
    organism_mod:"",
    default_val:"",
    numeric_scale:"",
    default_unit_id:"",
    required:false,
    reportable:false,
    scientific_notation:false,
    value_array_size_is_variable:false,
    use_for_counts:false,
    default_value_array_size:0,
    abnormal_result:false
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
