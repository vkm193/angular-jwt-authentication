import { Component, OnInit } from '@angular/core';
import { AccountService } from './../account.service';
import { Router } from '@angular/router';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: any;
  constructor(private accountService :AccountService, private router: Router, 
    private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      }
    );
  }

}
