import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from 'protractor';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = "http://localhost:50289/api/"
  private loggedIn = false;
  private userName = "";
  loggedInObservable = new Subject<boolean>(); 
  get LoggedIn(): boolean {
    const token = localStorage.getItem("token");
    if(token){
      this.loggedIn = true;
    }
    return this.loggedIn;
  }

  set LoggedIn(value: boolean) {
    this.loggedIn = value;
    this.loggedInObservable.next(value);
  }

  get UserName(): string{
    return this.userName;
  }

  set UserName(value: string){
    this.userName = value;
  }

  constructor(private http: HttpClient) { }

  login(loginModel: any){
    return this.http.post(this.baseUrl +"account/login", loginModel);
  }

  register(registerModel: any){
    return this.http.post(this.baseUrl +"account/register", registerModel);
  }
}
