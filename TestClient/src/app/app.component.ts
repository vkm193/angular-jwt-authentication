import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TestClient';
  loggedIn = false;
  userName = "";
  constructor(private accountService :AccountService, private router: Router){
    this.loggedIn = this.accountService.LoggedIn;
    this.userName = this.accountService.UserName;
  }
  ngOnInit(): void {
    this.accountService.loggedInObservable.subscribe(value => {
      this.loggedIn = value;
    });
  }

  onLogout(){
    localStorage.removeItem("token");
    this.accountService.UserName = "";
    this.accountService.LoggedIn = false;
    this.router.navigate(["/"]);
  }
}
