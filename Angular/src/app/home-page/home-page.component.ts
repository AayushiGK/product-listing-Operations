import { ClipboardModule } from '@angular/cdk/clipboard';
import { Router, Routes } from '@angular/router';
import { HomePageService } from './home-page.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private service: HomePageService, private router: Router,
    public modalService: NgbModal, public fb: FormBuilder) { }

  public categories = [
    { name: "Television" },
    { name: "Mobile" },
    { name: "Laptop" }
  ];
  public modalRef: NgbModalRef;
  public form: FormGroup;
  public baseUrl = "./assets/images";

  ngOnInit(): void {
    this.form = this.fb.group({
      product_name: [null, Validators.compose([Validators.required])],
      product_description: [null, Validators.compose([Validators.required])],
      product_url: null,
      product_category: [null, Validators.compose([Validators.required])],
      product_price:  [null, Validators.compose([Validators.required])],
    });
  }

  openModal(product) {
    this.modalRef = this.modalService.open(product);
  }

  onSubmit(value) {
    console.log(value);
    if (this.form.valid) {
      this.service.addProduct(value, data => {
        console.log('success', data)
      }, err => {
        console.log(err.stack)
      })
    }
    this.modalRef.close();
    this.router.navigateByUrl("/home/" + value.product_category);
  }

  closeModal() {
    this.modalRef.close();
  }

}
