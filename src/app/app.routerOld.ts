import { RouterModule } from "@angular/router";
import { TestComponent } from "./test/test.component";
import { TestGroupComponent } from "./test-group/test-group.component";
import { InstrumentComponent } from "./instrument/instrument.component";
import { AnalyteComponent } from "./analyte/analyte.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
//import { LogoutComponent } from "./logout/logout.component";

// Create the routing table
const routes = [
  { path: '', component: HomeComponent },
  { path: 'test', component: TestComponent },
//   { path: 'test/:testId', component: OrderComponent },
  { path: 'testgroup', component: TestGroupComponent },
  { path: 'instrument', component: InstrumentComponent },
  { path: 'analyte', component: AnalyteComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

// Process the routes and export the routing module
export const routing = RouterModule.forRoot(routes);