import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { BodyComponent } from './body.component';
import { AllProjectsComponent } from './allProjects.component';
import { SignupComponent } from './signup.component';
import { LoginComponent } from './login.component';
import { NavigationbarComponent } from './navigationbar.component';
import { NotificationsComponent } from './notifications.component';
import { ProfileComponent } from './profile.component';
import { ChallengesComponent } from './challenges.component';
import { PasswordResetComponent } from './passwordReset.component';
import { FAQComponent } from './faq.component';
import { StepComponent } from './step.component';
import { CommentSectionComponent } from './commentSection.component';
import { ProjectComponent, PopUpImageDialogComponent, ProjectLikersDialogComponent, StepLikersDialogComponent } from './project.component';
import { ProjectLinkComponent } from './projectLink.component';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {DataService} from './data.service';
import {CommunicationService} from './communication.service';
import { Slim } from './slim/slim.angular2';

import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { StarRatingModule } from 'angular-star-rating';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [  BrowserModule, BrowserAnimationsModule, MatIconModule, HttpClientModule, FormsModule, MatRadioModule, MatDialogModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule, StarRatingModule.forRoot(), RouterModule.forRoot(
    [
     {path: '', component: AllProjectsComponent},
     {path: 'signup', component: SignupComponent},
     {path: 'login', component: LoginComponent},
     {path: 'profile', component: ProfileComponent},
     {path: 'challenges', component: ChallengesComponent},
     {path: 'reset-password/:url_token', component: PasswordResetComponent},
     {path: 'faq', component: FAQComponent},
     {path: 'p/:url_token', component: ProjectComponent},
     {path: 'u/:url_token', component: UserComponent}
    ]) ],
  declarations: [ Slim, UserComponent, StepLikersDialogComponent, NotificationsComponent, NavigationbarComponent, CommentSectionComponent, ChallengesComponent, PasswordResetComponent, ProjectLikersDialogComponent, PopUpImageDialogComponent, StepComponent, FAQComponent, ProjectLinkComponent, ProjectComponent, ProfileComponent, LoginComponent, SignupComponent, AllProjectsComponent, BodyComponent ],
  bootstrap:    [ BodyComponent ],
  providers:    [ DataService, CommunicationService ],
  exports:      [],
  entryComponents: [ BodyComponent, PopUpImageDialogComponent, ProjectLikersDialogComponent, StepLikersDialogComponent ],
})
export class AppModule { }
