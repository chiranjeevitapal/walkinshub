import { Component  } from '@angular/core';
import { Router } from '@angular/router';
import { Walkin } from '../model/walkin';
import { HomeService } from './home.service';
import {JobFilterPipe} from '../pipes/jobfilter.pipe';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    errorMessage: string;
    jobs: Array<Walkin> = [];
    filteredJobs: Array<Walkin> = [];
    jobCount = 0;
    showDetails: boolean;
    walkin: Walkin;
    criteria: string;
    parameter: string;

    constructor(private router: Router, private homeService: HomeService) {
        this.loadJobs();
    }
    loadJobs() {
        this.homeService.getJobs()
            .subscribe(
            data => {
                this.jobs = data.jobs;
                this.filteredJobs = this.jobs;
            },
            error => this.errorMessage = <any>error);
    }
    seeDetails(walkinObj) {
        this.walkin = walkinObj;
        this.showDetails = true;
    }

    goBack() {
        this.showDetails = false;
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

    filter(parameter) {
        let filterPipe = new JobFilterPipe();
        this.filteredJobs = filterPipe.transform(this.jobs, this.criteria, parameter);
    }
    filterByLocation(arg) {
        this.criteria = 'location';
        this.filter(arg);
    }
    filterByEligibility(arg) {
        this.criteria = 'eligibility';
        this.filter(arg);
    }
    filterByExperience(arg) {
        this.criteria = 'experience';
        this.filter(arg);
    }
    resetFilters() {
        this.filteredJobs = this.jobs;
    }
}
