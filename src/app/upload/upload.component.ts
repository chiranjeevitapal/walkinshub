import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Walkin } from '../model/walkin';
import { UploadService } from './upload.service';

@Component({
    templateUrl: './upload.component.html'
})
export class UploadComponent implements OnInit {

    public myForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];
    public websites: String[];
    errorMessage: string;
    constructor(private router: Router, private formBuilder: FormBuilder, private uploadService: UploadService) { }
    ngOnInit() {
        this.websites = ['todaywalkins'];
        this.myForm = this.formBuilder.group({
            title: [''],
            date: [''],
            position: [''],
            location: [''],
            company: [''],
            eligibility: [''],
            experience: [''],
            jobDescription: [''],
            salary: [''],
            lastDate: [''],
            walkinDate: [''],
            walkinTime: [''],
            companyProfile: [''],
            howToApply: [''],
            website: [''],
            contactDetails: [''],
            jobRequirements: [''],
            candidateProfile: [''],
            websiteName: [this.websites[0]],
            websiteLink: ['']
        });

    }

    save(model: Walkin, isValid: boolean) {
        this.submitted = true; // set form submit to true

        // check if model is valid
        // if valid, call API to save customer
        console.log(model, isValid);

        if (isValid != undefined && isValid) {
            this.uploadService.postWalkin(model)
                .subscribe(
                data => {
                    alert("Data Uploaded..");
                    this.myForm = this.formBuilder.group({
                        title: [''],
                        date: [''],
                        position: [''],
                        location: [''],
                        company: [''],
                        eligibility: [''],
                        experience: [''],
                        jobDescription: [''],
                        salary: [''],
                        lastDate: [''],
                        walkinDate: [''],
                        walkinTime: [''],
                        companyProfile: [''],
                        howToApply: [''],
                        website: [''],
                        contactDetails: [''],
                        jobRequirements: [''],
                        candidateProfile: [''],
                        websiteName: [this.websites[0]],
                        websiteLink: ['']
                    });
                    let link = ['/uploadChethan'];
                    this.router.navigate(link);
                },
                error => {
                    this.errorMessage = <any>error;
                });
        }
    }


    scrapeWalkin(model: Walkin) {
        this.uploadService.scrapeWeb(model.websiteName, model.websiteLink)
            .subscribe(
            data => {
                this.myForm = this.formBuilder.group({
                    title: [data.title],
                    date: [data.date],
                    position: [data.position],
                    location: [data.location],
                    company: [data.company],
                    eligibility: [data.eligibility],
                    experience: [data.experience],
                    jobDescription: [data.jobDescription],
                    salary: [data.salary],
                    lastDate: [data.lastDate],
                    walkinDate: [data.walkinDate],
                    walkinTime: [data.walkinTime],
                    companyProfile: [data.companyProfile],
                    howToApply: [data.howToApply],
                    website: [data.website],
                    contactDetails: [data.contactDetails],
                    jobRequirements: [data.jobRequirements],
                    candidateProfile: [data.candidateProfile],
                    websiteName: [data.websiteName],
                    websiteLink: [data.websiteLink]
                });
            },
            error => this.errorMessage = <any>error);
    }
}
