import { Component } from '@angular/core';
import { TestAPIService } from '../test-api.service';

@Component({
  selector: 'app-icon-bar',
  templateUrl: './icon-bar.component.html',
  styleUrls: ['./icon-bar.component.css']
})
export class IconBarComponent {
  constructor(
    private _testService: TestAPIService
  ) {}

  chosenTest = this._testService.selectedTest;
  clickOtherBtn(){
    // Do something, can treat this like a general
    //var div = this.elRef.nativeElement.querySelector('#saveBtn');
  }
  deleteSelectedTest(){}
  // deleteSelectedTest(){
  //   try {
  //     let test_id = this.chosenTest().test_id;
  //     //this._testService.deleteTest({test_id});
  //     // Test will no longer be selected after deleting it
  //     this._testService.deleteTestState({test_id});
  //     this.chosenTest.set(undefined);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
