import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Register } from '../model/register';
import { RegisterService } from './register.service';
@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    public registrationForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];
    constructor(private router: Router, private formBuilder: FormBuilder, private registerService: RegisterService) { }
    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"), Validators.required])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(15), Validators.required])],
            active: false,
            role: ['user']
        });
    }
    register(model: Register, isValid: boolean) {
        this.submitted = true; // set form submit to true

        // check if model is valid
        // if valid, call API to save customer
        //console.log(model, isValid);

        if (isValid != undefined && isValid) {
            model._id = '' + model.email;
            this.registerService.registerUser(model)
                .subscribe(
                data => {
                    if (data.code == 11000) {
                        alert("Email id is already in use");
                    } else {
                        alert("A confirmation email is sent to your registered email address.");
                        let link = ['/home'];
                        this.router.navigate(link);
                    }
                },
                error => {
                    alert("Registration not successful. Please report the problem to walkinshub1@gmail.com");
                });
        }
    }
}
