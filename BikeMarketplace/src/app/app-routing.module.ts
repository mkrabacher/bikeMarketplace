import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogRegComponent } from './log-reg/log-reg.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { BrowseComponent } from './browse/browse.component';
import { ListingsComponent } from './listings/listings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    { path: 'log-reg', component: LogRegComponent },
    { path: 'marketplace', component: MarketplaceComponent, children : [
        { path: 'browse', component: BrowseComponent },
        { path: 'listings', component: ListingsComponent },
    ] },
    { path: '', pathMatch: 'full', redirectTo: '/log-reg' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
