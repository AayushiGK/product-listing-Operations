import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { searchPipe } from './pipes/search-pipe.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    searchPipe,
    HomePageComponent,
    ProductsComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MaterialModule,
    routing,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    searchPipe,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
