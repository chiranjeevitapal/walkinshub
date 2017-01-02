import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HomeComponent }      from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { routing } from './app.routing';
import { HomeService } from './home/home.service';
import { UploadService } from './upload/upload.service';
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
    declarations: [AppComponent, HomeComponent, DashboardComponent, UploadComponent, JobFilterPipe],
    providers: [HomeService, UploadService],
    bootstrap: [AppComponent],
})

export class AppModule {
}
