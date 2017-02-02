import { Component  } from '@angular/core';
import { Router } from '@angular/router';
import { Walkin } from '../model/walkin';
import { HomeService } from './home.service';
import {JobFilterPipe} from '../pipes/jobfilter.pipe';
import {OrderBy} from '../pipes/orderby.pipe';
import {UniquePipe} from '../pipes/unique.pipe';
import { AuthModel } from '../model/auth.model';
import { AppService } from '../app.service';
declare const FB: any;
@Component({
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
})
export class HomeComponent {
    errorMessage: string;
    jobs: Array<Walkin> = [];
    filteredJobs: Array<Walkin> = [];
    cityFilteredJobs: Array<Walkin> = [];
    eduFilteredJobs: Array<Walkin> = [];
    jobCount = 0;
    showDetails: boolean;
    walkin: Walkin;
    criteria: string;
    parameter: string;
    cities: string[];
    filteredCities: string[];
    education: string[];
    filteredEducation: string[];
    nativeWindow: any;
    isLoggedIn: boolean;

    constructor(private router: Router, private homeService: HomeService, private appService: AppService) {
      this.nativeWindow = homeService.getNativeWindow();
        this.loadJobs();
        this.cities = [];
        this.filteredCities = [];
        this.education = ['10th', '12th', 'BA', 'BCOM', 'BBA', 'BBM', 'BSC',
            'BHM', 'MBA', 'PGDM', 'BMS', 'MBA', 'MCOM', 'BE', 'BTECH', 'BCA', 'MCA',
            'MTECH', 'ME', 'BS', 'MS', 'MSC', 'MIB', 'MSW', 'MBBS', 'MD', 'MEDICAL',
            'MPHIL', 'BPHARM', 'MPHARM', 'PG', 'UG', 'DIPLOMA', 'INTER', 'ANY',
            'ITI', 'DEGREE'];
        this.filteredEducation = [];

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
    ngOnInit() {
        if (typeof (FB) != 'undefined' && FB != null) {
            FB.getLoginStatus(response => {
                this.statusChangeCallback(response);
            });
        }
    }
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
    loadJobs() {
        this.homeService.getJobs()
            .subscribe(
            data => {
                this.jobs = data.jobs;
                this.filteredJobs = this.jobs;
                data.jobs.forEach(item => {
                    if (this.cities.indexOf(item.location) == -1) {
                        this.cities.push(item.location);
                    }
                });
            },
            error => this.errorMessage = <any>error);
    }
    seeDetails(walkinObj) {
        let link = ['/walkin', walkinObj._id];
        //this.router.navigate(link);
        this.nativeWindow.open('/walkin/'+walkinObj._id);
    }




    selectedCities(checkedOption) {
        if (this.filteredCities.indexOf(checkedOption) == -1) {
            this.filteredCities.push(checkedOption);
        } else {
            this.filteredCities.splice(this.filteredCities.indexOf(checkedOption), 1);
        }
        this.filterResults();
    }

    selectedEducation(checkedOption) {
        if (this.filteredEducation.indexOf(checkedOption) == -1) {
            this.filteredEducation.push(checkedOption);
        } else {
            this.filteredEducation.splice(this.filteredEducation.indexOf(checkedOption), 1);
        }
        this.filterResults();
    }

    filterResults() {

        this.filteredJobs = [];
        this.jobs.forEach(job => {
            let cityMatch = false;
            let educationMatch = false;
            this.filteredCities.forEach(city => {
                if (job.location.toLowerCase() == city.toLowerCase()) {
                    cityMatch = true;
                }
            })
            this.filteredEducation.forEach(education => {
                if (job.eligibility.toLowerCase().indexOf(education.toLowerCase()) != -1) {
                    educationMatch = true;
                }
            })

            if (this.filteredCities.length == 0) {
                cityMatch = true;
            }
            if (this.filteredEducation.length == 0) {
                educationMatch = true;
            }

            //setTimeout(() => {
            if (cityMatch && educationMatch) {
                this.filteredJobs.push(job);
            }
            // }, 1000);
        });
    }

}
