import { Component, OnInit } from '@angular/core';
import './rxjs-operators';
import { AppService } from './app.service';
//declare const FB: any;
@Component({
    selector: 'walkinshub-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
      
  }
/*    isLoggedIn: boolean;
    currentUser: string;
    constructor() {

        FB.init({
            appId: '1646263562333117',
            cookie: false,  // enable cookies to allow the server to access
            // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.8' // use graph api version 2.5
        });
    }

    ngOnInit() {
        FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });
    }


    checkLoginState() {
        FB.login(response => {
            this.statusChangeCallback(response);
        }, { scope: 'public_profile,email' });
    }

    logOut() {
        FB.logout(response => {
            window.location.reload();
        });
        return false;
    }

    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            this.isLoggedIn = true;
            FB.api('/me', { locale: 'en_US', fields: 'name, email, picture'}, function(response) {
                this.currentUser = response.name;
                document.getElementById('username').innerHTML = response.name;
                console.log(response.picture.data.url);
                (<HTMLImageElement>document.querySelector("#userImg")).src = response.picture.data.url;
            });
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            this.isLoggedIn = false;
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            this.isLoggedIn = false;
        }
    };*/

}
