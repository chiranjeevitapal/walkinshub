import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Register } from '../model/register';
@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    public registrationForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];
    errorMessage: string;
    constructor(private formBuilder: FormBuilder) { }
    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.pattern('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'), Validators.required])],
            password: [''],
            confirmPassword: [''],
            role: ['user']
        });
    }
    register(model: Register, isValid: boolean) {
        this.submitted = true; // set form submit to true

        // check if model is valid
        // if valid, call API to save customer
        console.log(model, isValid);

        if (isValid != undefined && isValid) {

        }
    }
}
