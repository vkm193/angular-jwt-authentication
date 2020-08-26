import { Component, OnInit } from '@angular/core';
import { AccountService } from './../../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel: {userName: string, password: string} = {userName: "", password: ""};
  isError: boolean = false;
  errorMessage: string;
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(){
    this.accountService.login(this.loginModel).subscribe(
      (data) => {
        if(data["token"]){
          localStorage.setItem("token", data["token"]);
          this.accountService.LoggedIn = true;
          this.accountService.UserName = this.loginModel.userName;
          this.router.navigate(["/product"]);
        }
      },
      (error) => {
        this.isError = true;
        this.errorMessage = error.error;
      }
    );
  }

}
