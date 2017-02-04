import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FBService } from '../fb.service';
@Component({
    templateUrl: './tutorials.component.html',
    styleUrls: ['./tutorials.component.css']
})
export class TutorialsComponent {
    isCoreJava: boolean;
    isLoggedIn: boolean;
    constructor(private router: Router, private fbService: FBService) {
        this.fbService.initiate();
    }
    checkLoginState() {
        this.fbService.checkLoginState();
    }
    logOut() {
        this.fbService.logOut();
    }
    statusChangeCallback(response) {
        this.fbService.statusChangeCallback(response);
    };

    showTutotials(obj) {
        console.log(obj.value);
        if (obj.value == 'coreJava') {
            this.isCoreJava = true;
        }
    }
}
