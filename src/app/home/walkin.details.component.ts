import { Component, OnInit  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Walkin } from '../model/walkin';
import { HomeService } from './home.service';
import { FBService } from '../fb.service';

@Component({
    templateUrl: './walkin.details.component.html',
    styleUrls: ['../app.component.css']
})
export class WalkinDetailsComponent{
    walkin = new Walkin('',new Date(),'','','','','','','','','','','','','','','','','','','');
    errorMessage: string;
    isLoggedIn: boolean;
    showSubscribeButton: boolean;
    constructor(private router: Router, private route: ActivatedRoute, private homeService: HomeService, private fbService: FBService) {
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

    ngOnInit() {
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
