import { Injectable,WritableSignal,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Test } from './test-interface';

import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import {
  catchError,
  filter,
  forkJoin,
  map,
  Observable,
  shareReplay,
  switchMap,
  throwError
} from 'rxjs';

//https://stackoverflow.com/questions/46991237/how-to-import-json-file-into-a-typescript-file
import data from './test_data.json';

@Injectable({
  providedIn: 'root'
})
export class TestAPIService {
  tests: WritableSignal<any> = signal([]);  // The logged-in user 
  test: WritableSignal<any> = signal(undefined);  // single test
  error: WritableSignal<any> = signal(undefined); // An error message
  //tree: WritableSignal<any> = signal(undefined); // Tree structure so we can update the tree outside test component
  constructor(private _http: HttpClient) { }

  // GET OPERATIONS
  getAllTestsFake(){
    this.tests.set(data)
  }
  getAllTests(){
    this._http.get('/api/getAllTests')
    .subscribe({
            next: (tests) => this.tests.set(tests),  // On success, set the test signal
            error: (err) => this.error.set(err.error) // On failed, set error signal
          });
  }
  getTestFake(){
    //console.log(test_id);
    this.test.set(this.selected)
  }
  getTest(test:string){
    this._http.get('/api/getTest')
    .subscribe({
            next: (test) => this.test.set(test),  // On success, set the test signal
            error: (err) => this.error.set(err.error) // On failed, set error signal
          });
  }

  // POST OPERATIONS
  // passing data such as test_id,description,name, etc
  createTest(data:object){
    this._http.post('/api/createTest',{data})
    .subscribe({
            next: (test) => this.test.set(test),  // On success, do something else
            error: (err) => this.error.set(err.error) // On failed, set error signal
          });
  }

  // PATCH OPERATIONS
  updateTest(data:object){
    this._http.patch('/api/updateTest',{data})
    .subscribe({
            next: (test) => this.test.set(test),  // On success, send message
            error: (err) => this.error.set(err.error) // On failed, set error signal
          });
  }

  // DELETE OPERATION
  // the data contains only test_id
  deleteTest(data:object){
    this._http.delete('/api/deleteTest',data)
    .subscribe({
            next: (test) => this.test.set(test),  // On success, send message
            error: (err) => this.error.set(err.error) // On failed, set error signal
          });
  }
  deleteTestState(data:any){
    console.log(data);
    let arr = this.tests().data.filter((obj) => obj.test_id !== data.test_id);
    console.log(arr);
    let d = {"data":arr}
    this.tests.set(d);
    //this.tests.update(vals=>vals.data.filter((obj) => obj.test_id !== data.test_id));
  }
  
  //selectedTest = signal<Test | undefined>(undefined); can set it to specific type this way
  selected = signal(undefined);

  // private vehicleFilms$ = toObservable(this.selected).pipe(
  //   filter(Boolean),
  //   switchMap(test =>
  //     forkJoin(test.testid.map(id =>
  //       this._http.get<Film>(id)))
  //   )
  // );
  testSelected(testName: string) {
    const foundTest = this.tests().find((t:any) => t.name === testName);
    this.selected.set(foundTest);
  }
}

// Test
//  |
//  |
//  |_ Mneumonic
// Tests need to come back in this type format
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

  // login(username: string, password: string) {
  //   this._http.post('/api/login', { username, password })
  //     .subscribe({
  //       next: (user) => this.user.set(user),  // On success, set the user signal
  //       error: (err) => this.error.set(err.error) // On failed, set error signal
  //     });
  // }

  // logout() {
  //   this.user.set(undefined);  // Set the user signal to nothing
  // }
//}