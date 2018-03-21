import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-browse',
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
    searchTerm;
    bikes;
    loggedUser;
    constructor(
        private _httpService: HttpService,
    ) {
        this.loggedUser = this._httpService.retrieveLogUser();
        this.searchTerm = '';
    }

    ngOnInit() {
        this.getAllBikesThroughService();
    }

    getAllBikesThroughService() {
        const observable = this._httpService.getAllBikes();
        observable.subscribe(data => {
            console.log('got back: ', data);
            this.bikes = data['bikes'];
        });
    }

    deleteBikeThroughService(bike) {
        const observable = this._httpService.deleteBike(bike);
        observable.subscribe(data => {
            console.log(data);
        });
    }

    contactThroughService(id) {
        const observable = this._httpService.contact({id: id});
        observable.subscribe(data => {
            console.log(data);
            alert(`Name: ${data['user'][0]['fName']} ${data['user'][0]['lName']} Email: ${data['user'][0]['email']}`);
        });
        this.getAllBikesThroughService();
    }
}
