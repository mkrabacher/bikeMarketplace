import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class HttpService {
    loggedUser;
    constructor(
        private _http: HttpClient,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    login(loginUser) {
        console.log('logging in through service');
        return this._http.post('/loginUser', loginUser);
    }

    register(registerUser) {
        console.log('registering through service');
        return this._http.post('/registerUser', registerUser);
    }

    setLogUser(loggedUser) {
        this.loggedUser = loggedUser;
        this._router.navigate(['/marketplace/browse']);
    }

    retrieveLogUser() {
        console.log(this.loggedUser);
        return this.loggedUser;
    }

    getAllBikes() {
        return this._http.get('/allBikes');
    }

    getUserBikes(loggedUser) {
        return this._http.post('/userBikes', loggedUser);
    }

    addBike(newBike) {
        return this._http.post('/addBike', newBike);
    }

    updateBike(bike) {
        return this._http.post('/updateBike', bike);
    }

    deleteBike(bike) {
        return this._http.post('/deleteBike', bike);
    }

    contact(id) {
        return this._http.post('/contact', id);
    }
}
