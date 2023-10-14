import { Component } from '@angular/core';
import { TestNode, ExampleFlatNode } from '../test-interface';
import { TestAPIService } from '../test-api.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogService } from '../confirmation-dialog.service';
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
    private _testService: TestAPIService,
    private _snackBar: MatSnackBar,
    private confirmationDialogService: ConfirmationDialogService
  ) {
    // effect(() => {
    //   console.log(this.tests(), "changed");
    // });
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
  chosenTest = this._testService.selected;
  foundTest = [];

  sortSelect = 0;
  sortBys: any[] = [
    {sort_id: 1, description: 'ALPHABET'},
    {sort_id: 2, description: 'DATE'}
  ];
  // Sneckbar error
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
    });
  }
  
  // Function to handle the selection change event
  onSelectOption(event:any): void {
    const selectedOption = event.value;
    localStorage.setItem('selectedLab', selectedOption);
    this.currLab= selectedOption;
  }
  confirmDeleteAction(): void {
    this.confirmationDialogService
      .openConfirmationDialog('Confirmation', 'Are you sure you want to do this?')
      .subscribe((confirmed) => {
        if (confirmed) {
          // User clicked Yes, proceed with the action
          this.deleteSelectedTest();
        } else {
          console.log('NOTHING HAPPENED')
          // User clicked No, do nothing or handle accordingly
        }
      });
  }
  confirmCutAction(): void {
    this.confirmationDialogService
      .openConfirmationDialog('Confirmation', 'Are you sure you want to do this?')
      .subscribe((confirmed) => {
        if (confirmed) {
          // User clicked Yes, proceed with the action
          this.cutSelectedTest();
        } else {
          console.log('NOTHING HAPPENED')
          // User clicked No, do nothing or handle accordingly
        }
      });
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
  copySelectedTest(){
    try {
      // Recasting since chosenTest is of type Test
      let buffer:any;
      buffer = this.chosenTest();
      // If there's no test selected or delete item that's already copied
      if(!buffer){
        this.openSnackBar('Select test or else I break', 'Dismiss');
        return;
      }else if(localStorage.getItem('copiedTest')){
        localStorage.removeItem('copiedTest');
      }
      buffer = JSON.stringify(buffer);
      //console.log(buffer)
      localStorage.setItem('copiedTest', buffer);
    } catch (error) {
      console.log(error);
    }
  }
  // Does a delete of the test and saves to localstorage
  cutSelectedTest(){
    try {
      // Recasting since chosenTest is of type Test
      let buffer:any;
      buffer = this.chosenTest();
      // If there's no test selected or delete item that's already copied
      if(!buffer){
        this.openSnackBar('Select test or else I break', 'Dismiss');
        return;
      }else if(localStorage.getItem('copiedTest')){
        localStorage.removeItem('copiedTest');
        this.deleteSelectedTest();
      }
      buffer = JSON.stringify(buffer);
      //console.log(buffer)
      localStorage.setItem('copiedTest', buffer);
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
  // Do this or not?
  // expandNode(depth:number) {
  //   this.treeControl.expand(this.treeControl.dataNodes[4]);
  //   this.treeControl.expand(this.treeControl.dataNodes[5]);
  // }
  // // Search for a specific test by name
  // searchAll(text: string) {
  //   this.foundTest = this.tests().data.filter(test => test.name.toLowerCase().includes(text.toLowerCase()));
  //   this.foundTest = this.foundTest.map((x) => x.name );
  //   const recur=(target,searchArr)=>{
  //     // Array is always passes in and we will check every object in this array to confirm 
  //     // or deny if the target value is in.
  //     for(let lookFor of searchArr){
  //       if(target == lookFor.name){
  //         this.foundTest = lookFor;
  //         return
  //       }
  //       if(lookFor.children) recur(target,lookFor.children);
  //     }
  //   }
  // }
  sortTests(by:number): void {
    //by is coming in as the number in the sort dropdown
    let sortBy:string = this.sortBys[by-1].description;
    let sorted;
    // Either Alphabet, DateCreated
    if(sortBy === 'DATE'){
      //sorted = this.tests().data.sort((a,b)=> a.entry_datetime - b.entry_datetime);
      sorted =this.tests().data.sort(function(a,b) {
        a = a.entry_datetime.split('/').reverse().join('');
        b = b.entry_datetime.split('/').reverse().join('');
        return a > b ? 1 : a < b ? -1 : 0;
        // return a.localeCompare(b);         // <-- alternative 
      });
      this.tests.set({"data":sorted});
    }else if(sortBy === 'ALPHABET'){
      // Special sort needed for string within an object for some reason
      sorted = this.tests().data.sort((a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
      console.log(sorted)
      this.tests.set({"data":sorted});
    }
    // Now set the tree so it updates with the new state value order
    this.dataSource.data = this.tests().data;
  }
}