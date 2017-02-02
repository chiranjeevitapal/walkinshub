import { Component, OnInit  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Walkin } from '../model/walkin';
import { HomeService } from './home.service';
import { AuthModel } from '../model/auth.model';
import { AppService } from '../app.service';
declare const FB: any;

@Component({
    templateUrl: './walkin.details.component.html'
})
export class WalkinDetailsComponent{
    walkin = new Walkin('',new Date(),'','','','','','','','','','','','','','','','','','','');
    errorMessage: string;
    isLoggedIn: boolean;
    constructor(private router: Router, private route: ActivatedRoute, private homeService: HomeService, private appService: AppService) {
      if (typeof (FB) != 'undefined' && FB != null) {
          FB.init({
              appId: '1646263562333117',
              status: true,
              cookie: true,
              xfbml: true,
              version: 'v2.8'
          });
          FB.AppEvents.logPageView();
      }
    }
    authParams = new AuthModel('', '', '', '', '', true, '');

    checkLoginState() {
        if (typeof (FB) != 'undefined' && FB != null) {
            FB.login(response => {
                this.statusChangeCallback(response);
            }, { scope: 'public_profile,email' });
        }
    }

    logOut() {
        if (typeof (FB) != 'undefined' && FB != null) {
            FB.logout(response => {
                window.location.reload();
            });
            return false;
        }
    }

    statusChangeCallback(response) {
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            this.isLoggedIn = true;
            let that = this;
            if (typeof (FB) != 'undefined' && FB != null) {
                FB.api('/me', {
                    locale: 'en_US', fields: 'first_name, last_name, email, gender, verified, picture'
                }, function(response) {
                    document.getElementById('username').innerHTML = response.first_name;
                    (<HTMLImageElement>document.querySelector("#userImg")).src = response.picture.data.url;
                    that.authParams.fb_id = response.id;
                    that.authParams.fb_first_name = response.first_name;
                    that.authParams.fb_last_name = response.last_name;
                    that.authParams.fb_email = response.email;
                    that.authParams.fb_gender = response.gender;
                    that.authParams.fb_verified = response.verified;
                    that.authParams.fb_picture = response.picture.data.url;

                    that.appService.registerUser(that.authParams)
                        .subscribe(
                        data => {
                            //console.log("data uploaded successfully..");
                        },
                        error => {
                            //console.log("data upload failed..");
                            this.errorMessage = <any>error;
                        })

                });
            }
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            this.isLoggedIn = false;
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            this.isLoggedIn = false;
        }
    };

    ngOnInit() {
      if (typeof (FB) != 'undefined' && FB != null) {
          FB.getLoginStatus(response => {
              this.statusChangeCallback(response);
          });
      }
      this.route.params.forEach((params: Params) => {
      let id = params['id'];
        this.homeService.getWalkin(id)
            .subscribe(
            data => {
                if(data.code == 500){
                  this.errorMessage = ''+data.error;
                }else{
                  this.walkin = data[0];
                  this.errorMessage = '';
                }

            },
            error => {
              this.errorMessage = <any>error
            })
          })
    }

    goBack() {
        let link = ['/home'];
        this.router.navigate(link);
    }

    openWebsite(website) {
        if (website.indexOf('http') == -1) {
            window.open(
                'http://' + website,
                '_blank'
            );
        } else {
            window.open(
                website,
                '_blank'
            );
        }
    }

}
