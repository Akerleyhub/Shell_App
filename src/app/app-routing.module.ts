import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from "./test/test.component";
import { TestGroupComponent } from "./test-group/test-group.component";
import { InstrumentComponent } from "./instrument/instrument.component";
import { AnalyteComponent } from "./analyte/analyte.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { LogoutComponent } from "./logout/logout.component";

import { NewControlTypeComponent } from './new-control-type/new-control-type.component';
import { NewInterpPatternComponent } from './new-interp-pattern/new-interp-pattern.component';
import { NewMethodComponent } from './new-method/new-method.component';
import { NewSupplyComponent } from './new-supply/new-supply.component';
import { NewSupplyControltypeComponent } from './new-supply-controltype/new-supply-controltype.component';
import { NewTestComponent } from './new-test/new-test.component';
import { NewTestgroupComponent } from './new-testgroup/new-testgroup.component';
import { NewAnalyteComponent } from './new-analyte/new-analyte.component';

// Create the routing table
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test', component: TestComponent },
//   { path: 'test/:testId', component: OrderComponent },
  { path: 'testgroup', component: TestGroupComponent },
  { path: 'instrument', component: InstrumentComponent },
  { path: 'analyte', component: AnalyteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'newcontrol', component: NewControlTypeComponent },
  { path: 'newinterppattern', component: NewInterpPatternComponent },
  { path: 'newanalyte', component: NewAnalyteComponent},
  { path: 'newmethod', component: NewMethodComponent },
  { path: 'newsupply', component: NewSupplyComponent },
  { path: 'newsupplycontrol', component: NewSupplyControltypeComponent },
  { path: 'newtest', component: NewTestComponent },
  { path: 'newtestgroup', component: NewTestgroupComponent },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }