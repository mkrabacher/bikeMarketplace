import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-marketplace',
    templateUrl: './marketplace.component.html',
    styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {
    // loggedInUser; // remove this when you turn off auto login
    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        // // turn this on to use log reg again.
        if (this._httpService.retrieveLogUser() == null) {
            this._router.navigate(['/log-reg']);
        } else {
            this._router.navigate(['/marketplace/browse']);
        }
        // // turn the below off to not auto log in.
        // const autoLogin = {
        //     email: 'matt@kreb.com',
        //     password: 'aA121212'
        // };
        // const observable = this._httpService.login(autoLogin);
        // observable.subscribe(data => {
        //     console.log(data);
        //     if (data['loggedUser']) {
        //         this.loggedInUser = data['loggedUser'];
        //         this._httpService.setLogUser(this.loggedInUser);
        //     }
        // });
    }

    logOff() {
        this._httpService.setLogUser = null;
        this._router.navigate(['/log-reg']);
    }
}
