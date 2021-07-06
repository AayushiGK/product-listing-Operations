import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from './product-detail.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public product;
  constructor(public service: ProductDetailService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.getProduct(param);
    });
  }

  getProduct(product) {
    this.service.getProduct(product, data => {
      this.product = data.data;
      console.log('product', this.product)
    }, err => {
      console.log(err.stack);
    })
  }

  updateProduct(product) {
    this.service.updateProduct(product, data => {
      console.log(data)
    }, err => {
      console.log(err.stack);
    })
  }
}
