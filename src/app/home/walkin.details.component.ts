import { Component, OnInit  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Walkin } from '../model/walkin';
import { HomeService } from './home.service';

@Component({
    templateUrl: './walkin.details.component.html'
})
export class WalkinDetailsComponent{
    walkin = new Walkin('',new Date(),'','','','','','','','','','','','','','','','','','','');
    errorMessage: string;
    constructor(private router: Router, private route: ActivatedRoute, private homeService: HomeService) { }

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
