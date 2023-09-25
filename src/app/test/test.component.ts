import { Component } from '@angular/core';
import { TestNode, ExampleFlatNode } from '../test-interface';
import { TestAPIService } from '../test-api.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';


// Note:There can be tests within a test
// const TREE_DATA: TestNode[] = [
//   {
//     name: 'Whole genome sequencing',
//     children: [{ name: 'WGS' }, { name: 'NGS' }, { name: 'TNGS' }],
//   },
//   {
//     name: 'Cryptosporidium',
//     children: [
//       {
//         name: 'Test within a test',
//         children: [{ name: 'Mneumonic1' }, { name: 'Mneumonic2' }],
//       },
//       {
//         name: 'Another Test within test',
//         children: [{ name: 'Pumpkin spice' }, { name: 'Carrots' }],
//       },
//     ],
//   },
// ];

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  private _transformer = (node: TestNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };
  
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );
    
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  currLab: string;
  labs:string[]=['BACT','MYCOBACT','VRS','RIL','MYCOLOGY'];
  constructor(
    private _testService: TestAPIService
  ) {
    this._testService.getAllTestsFake();
    this.currLab= localStorage.getItem('selectedLab');
    //console.log(this.tests().data); 
    //So friggin awesome, setting the node data to what the test API returns
    this.dataSource.data = this.tests().data;
    //this.dataSource.data = TREE_DATA; //replace with an API call to get all formatted json
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  
  // Not tree logic
  // Subscribe to the service being used in the Service. Should return a json
  tests = this._testService.tests;
  // Signals used in the template
  chosenTest = this._testService.selectedTest;
  foundTest = [];

  sortSelect = 0;
  sortBys: any[] = [
    {sort_id: 1, description: 'ALPHABET'},
    {sort_id: 2, description: 'DATE'}
  ];

  
  // Function to handle the selection change event
  onSelectOption(event:any): void {
    const selectedOption = event.value;
    localStorage.setItem('selectedLab', selectedOption);
    this.currLab= selectedOption;
  }
  testSelected(testName: string) {
    let foundTest;
    // Need to do a depth search to see if any children exist with this data
    const recur=(target,searchArr)=>{
      // Array is always passes in and we will check every object in this array to confirm 
      // or deny if the target value is in.
      for(let lookFor of searchArr){
        if(target == lookFor.name){
          foundTest = lookFor;
          return
        }
        if(lookFor.children) recur(target,lookFor.children);
      }
    }
    console.log(this.tests().data)
    recur(testName, this.tests().data);
    //const foundTest = this.tests().data.find((t:any) => t.name === testName);
    this.chosenTest.set(foundTest);
  }
  deleteSelectedTest(){
    try {
      let test_id = this.chosenTest().test_id;
      //this._testService.deleteTest({test_id});
      // Test will no longer be selected after deleting it
      this._testService.deleteTestState({test_id});
      this.chosenTest.set(undefined);
      this.dataSource.data = this.tests().data;
    } catch (error) {
      console.log(error);
    }
  }
  // This only works at the test to mneu level, not TG
  moveUp(){
    let mneuName = this.chosenTest().name;
    //let data = this.tests().data;
    // Need to find the mneumonic first, then swap withthe previous
    for(let [i,d] of this.tests().data.entries()){
      if(d.children){
        for(let [index, child] of d.children.entries()){
          if(child.name == mneuName){
            // Perform a swap of values
            let temp = d.children[index-1];
            d.children[index-1] = child;
            d.children[index] = temp;
            let swappedFinal = d.children;
            //console.log(d.children,'post swap')
            // Mutate the state and update the tree, will close it sadly :(
            this.tests.mutate(val => { val.data[i].children = swappedFinal});
            this.dataSource.data = this.tests().data;
            return;
          }
        }
      }
    }
  }
  moveDown(){
    let mneuName = this.chosenTest().name;
    // Need to find the mneumonic first, then swap withthe previous
    for(let [i,d] of this.tests().data.entries()){
      if(d.children){
        for(let [index, child] of d.children.entries()){
          if(child.name == mneuName){
            // Perform a swap of values
            let temp = d.children[index+1];
            d.children[index+1] = child;
            d.children[index] = temp;
            let swappedFinal = d.children;
            //console.log(d.children,'post swap')
            // Mutate the state and update the tree, will close it sadly :(
            this.tests.mutate(val => { val.data[i].children = swappedFinal});
            this.dataSource.data = this.tests().data;
            return;
          }
        }
      }
    }
  }


  // Search for a specific test by name
  filterResults(text: string) {
    this.foundTest = this.tests().data.filter(test => test.name.toLowerCase().includes(text.toLowerCase()));
    this.foundTest = this.foundTest.map((x) => x.name );
  }
  sortTests(event: Event): void {
    const target = event.target as HTMLSelectElement;
    let by = target.value;
    console.log(by)
    let sorted= [];
    // Either Alphabet, DateCreated
    if(by === 'DATE'){
      sorted = this.tests().data.sort((a,b)=> a.date_made - b.date_made);
      this.tests.set(sorted);
    }else if(by === 'ALPHABET'){
      sorted = this.tests().data.sort((a,b)=> a.name - b.name);
      this.tests.set(sorted);
    }
  }
}