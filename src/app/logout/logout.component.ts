import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(
    // private _authService: AuthService,
    private _router: Router) { }

  ngOnInit() {
    //this._authService.logout();
    //this._areaService.area.set("");
    console.log("Loggin out...");
    localStorage.removeItem('user');
    this._router.navigate(['/login']);
    window.location.href="/" // want a page refresh to happen
  }
}