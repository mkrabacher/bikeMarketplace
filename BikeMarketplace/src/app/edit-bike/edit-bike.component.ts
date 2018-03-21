import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-edit-bike',
    templateUrl: './edit-bike.component.html',
    styleUrls: ['./edit-bike.component.css']
})
export class EditBikeComponent implements OnInit {
    @Input() bike: any;
    constructor(
        private _httpService: HttpService
    ) {
    }

    ngOnInit() {
    }

    updateBikeThroughService() {
        const observable = this._httpService.updateBike(this.bike);
        observable.subscribe(data => {
            console.log(data);
        });
    }

    deleteBikeThroughService(id) {
        const observable = this._httpService.deleteBike(this.bike);
        observable.subscribe(data => {
            console.log(data);
        });
    }
}
