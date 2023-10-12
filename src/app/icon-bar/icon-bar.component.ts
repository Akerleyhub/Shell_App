import { Component, Input } from '@angular/core';
import { TestAPIService } from '../test-api.service';

@Component({
  selector: 'app-icon-bar',
  templateUrl: './icon-bar.component.html',
  styleUrls: ['./icon-bar.component.css']
})
export class IconBarComponent {
  @Input() deleteSelectedTest: () => void;
  //@Input() function2: () => void;

  constructor(
    private _testService: TestAPIService
  ) {}

  callParentDelete() {
    if (this.deleteSelectedTest) {
      this.deleteSelectedTest();
    }
  }

  chosenTest = this._testService.selected;
  //treeStructure = this._testService.tree;
  clickOtherBtn(){
    // Do something, can treat this like a general
    //var div = this.elRef.nativeElement.querySelector('#saveBtn');
  }
}
