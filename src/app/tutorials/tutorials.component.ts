import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FBService } from '../fb.service';
@Component({
    templateUrl: './tutorials.component.html',
    styleUrls: ['./tutorials.component.css','../app.component.css']
})
export class TutorialsComponent {
    isCoreJava: boolean;
    isAngularjs: boolean;
    isLoggedIn: boolean;
    showSubscribeButton: boolean;
    constructor(private router: Router, private fbService: FBService) {
        this.fbService.initiate();
        if(localStorage.getItem("user") != undefined && localStorage.getItem("user") != null){
            this.showSubscribeButton = false;
        }else{
          this.showSubscribeButton = true;
        }
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
        this.isCoreJava = false;
        this.isAngularjs = false;
        if (obj.value == 'coreJava') {
            this.isCoreJava = true;
        }
        if (obj.value == 'angularJs') {
            this.isAngularjs = true;
        }
    }
}
