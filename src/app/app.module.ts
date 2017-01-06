import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HomeComponent }      from './home/home.component';
import { PostJobComponent }      from './home/postjob.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { RegisterComponent } from './register/register.component';
import { routing } from './app.routing';
import { HomeService } from './home/home.service';
import { UploadService } from './upload/upload.service';
import { RegisterService } from './register/register.service';
import {JobFilterPipe} from './pipes/jobfilter.pipe';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing
    ],
    declarations: [AppComponent, HomeComponent, DashboardComponent, UploadComponent, RegisterComponent, PostJobComponent, JobFilterPipe],
    providers: [HomeService, UploadService, RegisterService],
    bootstrap: [AppComponent],
})

export class AppModule {
}
