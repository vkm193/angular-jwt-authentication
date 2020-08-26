import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:50289/api/";

  constructor(private http: HttpClient) { }

  getProducts(){
    const header = new HttpHeaders({
      "Authorization": "Bearer " + localStorage.getItem("token")
    });
    return this.http.get(this.baseUrl + "product", {headers: header});
  }
}
