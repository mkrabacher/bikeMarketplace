import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LogRegComponent } from './log-reg/log-reg.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { BrowseComponent } from './browse/browse.component';
import { ListingsComponent } from './listings/listings.component';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditBikeComponent } from './edit-bike/edit-bike.component';


@NgModule({
  declarations: [
    AppComponent,
    LogRegComponent,
    MarketplaceComponent,
    BrowseComponent,
    ListingsComponent,
    PageNotFoundComponent,
    EditBikeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
