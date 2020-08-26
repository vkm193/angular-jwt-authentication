import { Component, OnInit } from '@angular/core';
import { AccountService } from './../../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerModel: {firstName: string, lastName: string, passwordHash: string, email: string} = 
  {firstName: "", lastName: "", email: "", passwordHash: ""};

  constructor(private accountService :AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(){
    this.accountService.register(this.registerModel).subscribe(
      (data) => {
        this.router.navigate(["/account/login"]);
      }
    );
  }

}
