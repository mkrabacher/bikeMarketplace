import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-listings',
    templateUrl: './listings.component.html',
    styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
    newBike;
    userBikes;
    loggedUser;
    constructor(
        private _httpService: HttpService
    ) {
        this.loggedUser = this._httpService.retrieveLogUser();
        this.getUserBikesThroughService();
    }

    ngOnInit() {
        this.newBike = {
            userID: this.loggedUser['_id'],
            title: '',
            description: '',
            price: '',
            location: '',
            imgUrl: '',
        };
    }

    getUserBikesThroughService() {
        const observable = this._httpService.getUserBikes(this.loggedUser);
        observable.subscribe(data => {
            console.log(data);
            this.userBikes = data['bikes'];
        });
    }

    addBikeThroughService() {
        this.newBike.userID = this.loggedUser['_id'];
        const observable = this._httpService.addBike(this.newBike);
        observable.subscribe(data => {
            console.log(data);
        });
        this.newBike = {
            userID: this.loggedUser['_id'],
            title: '',
            description: '',
            price: '',
            location: '',
            imgUrl: '',
        };
        this.getUserBikesThroughService();
    }

}
