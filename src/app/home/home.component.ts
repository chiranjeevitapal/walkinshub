import { Component  } from '@angular/core';
import { Router } from '@angular/router';
import { Walkin } from '../model/walkin';
import { HomeService } from './home.service';
import {JobFilterPipe} from '../pipes/jobfilter.pipe';
import {OrderBy} from '../pipes/orderby.pipe';
import {UniquePipe} from '../pipes/unique.pipe';

@Component({
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
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
      let link = ['/walkin', walkinObj._id];
      this.router.navigate(link);
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
        //this.filteredJobs = this.jobs;
        window.location.reload();
    }
}
