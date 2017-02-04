import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    profile : any;
    public profileForm: FormGroup;
    constructor(private router: Router, private formBuilder: FormBuilder, private profileService: ProfileService) { }

    ngOnInit() {

        this.profileForm = this.formBuilder.group({
            fb_first_name: new FormControl('', [<any>Validators.required]),
            fb_last_name: new FormControl('', [<any>Validators.required]),
            fb_email: new FormControl('', [<any>Validators.required])
        });
        this.loadProfile();
    }

    loadProfile() {
        this.profileService.getProfile(localStorage.getItem("user"))
            .subscribe(
            data => {
              this.profile = data[0];
              this.profileForm = this.formBuilder.group({
                  fb_first_name: [this.profile.fb_first_name],
                  fb_last_name: [this.profile.fb_last_name],
                  fb_email: [this.profile.fb_email]
              });
            },
            error => {

            });
    }
}
