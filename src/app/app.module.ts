import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { TestGroupComponent } from './test-group/test-group.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { AnalyteComponent } from './analyte/analyte.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { IconBarComponent } from './icon-bar/icon-bar.component';
import {  FormsModule } from '@angular/forms';

import { NewTestComponent } from './new-test/new-test.component';
import { NewTestgroupComponent } from './new-testgroup/new-testgroup.component';
import { NewAnalyteComponent } from './new-analyte/new-analyte.component';
import { NewInterpPatternComponent } from './new-interp-pattern/new-interp-pattern.component';
import { NewControlTypeComponent } from './new-control-type/new-control-type.component';
import { NewSupplyComponent } from './new-supply/new-supply.component';
import { NewSupplyControltypeComponent } from './new-supply-controltype/new-supply-controltype.component';
import { NewMethodComponent } from './new-method/new-method.component';

// Style
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTreeModule } from '@angular/material/tree';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TestViewComponent } from './test-view/test-view.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    TestGroupComponent,
    InstrumentComponent,
    AnalyteComponent,
    LoginComponent,
    NotFoundComponent,
    HomeComponent,
    LogoutComponent,
    IconBarComponent,
    NewTestComponent,
    NewTestgroupComponent,
    NewAnalyteComponent,
    NewInterpPatternComponent,
    NewControlTypeComponent,
    NewSupplyComponent,
    NewSupplyControltypeComponent,
    NewMethodComponent,
    TestViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

