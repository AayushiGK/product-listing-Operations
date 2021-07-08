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
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    searchPipe,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
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
