import { Component } from '@angular/core';
import {DataService} from './data.service';
import {CommunicationService} from './communication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-component',
  template: `



    <div class="default-data-container">

        <div class="col-md-12 col-xs-12" style="padding-left: 0; padding-right: 0px;">

            <div class="well default-well">


                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-xs-12">
                        <div class="row">
                            <div class="col-xs-12">
                                <div align="center">

                                    <div *ngIf="loginError.error" class="alert alert-danger fade in">
                                        <i class="fa-fw fa fa-times"></i>
                                        <strong>Kirjautumisongelma!</strong> {{loginError.error_message}}
                                    </div>

                                    <div *ngIf="passwordResetResponse.error" class="alert alert-danger fade in">
                                        <i class="fa-fw fa fa-times"></i>
                                        <strong>Ongelma!</strong> {{passwordResetResponse.error_message}}
                                    </div>

                                    <div *ngIf="passwordResetResponse.reset_email_sended" class="alert alert-success fade in">
                                        <i class="fa-fw fa fa-check"></i>
                                        <strong>Viesti lähetetty!</strong> Sähköpostiosoitteeseesi on lähetetty ohjeet salasanan vaihtamiseksi.
                                    </div>


                                    <h3 style="margin-bottom: 30px;" align="center">Kirjaudu sisään</h3>
                                    <div class="well" style="max-width: 600px;">

                                        <div class="form-title">
                                            Kirjautumistiedot
                                        </div>
                                        <div class="form-group">
                                            <span class="input-icon icon-right">
                                                <input (keyup.enter)="login()" [(ngModel)]="username" type="text" class="form-control" id="userameInput" placeholder="Käyttäjänimi">
                                                <i class="glyphicon glyphicon-user circular"></i>
                                            </span>
                                        </div>
                                        <div class="form-group">
                                            <span class="input-icon icon-right">
                                                <input (keyup.enter)="login()" [(ngModel)]="password" type="password" class="form-control" id="passwordInput" placeholder="Salasana">
                                                <i class="fa fa-lock circular"></i>
                                            </span>
                                        </div>

                                        <hr class="wide">
                                        <button [class.disabled]="ongoingPost" (click)="login()" class="btn btn-blue"><span><i *ngIf="ongoingPost" class='fa fa-spinner fa-spin fa-fw'></i> Kirjaudu</span></button>

                                    </div>


                                    <div class="well" style="max-width: 600px; margin-bottom: 10px;">
                                        <div>
                                            Ei tunnuksia vielä? <a routerLink="/signup">Rekisteröidy käyttäjäksi!</a>
                                        </div>
                                    </div>

                                    <div class="well" style="max-width: 600px; margin-bottom: 5px;">
                                        <div>
                                            Unohditko salasanasi? <div (click)="resetPasswordDialog = !resetPasswordDialog" style="color: #337ab7; cursor: pointer; display: inline-block;">Palauta salasana</div>
                                        </div>
                                    </div>

                                    <div *ngIf="resetPasswordDialog" class="well" style="max-width: 600px; margin-bottom: 10px;">

                                    <div class="row">

                                        <div class="col-sm-8 col-xs-12">
                                            <input [(ngModel)]="email" type="text" class="form-control" placeholder="Sähköpostiosoiteesi">
                                        </div>
                                        <div class="col-sm-4 col-xs-12">
                                            <button [class.disabled]="!email" (click)="reset_password(); resetPasswordDialog = false;" class="btn btn-blue pull-right"> Palauta</button>
                                        </div>

                                        </div>


                                    </div>



                                </div>

                            </div>
                        </div>



                    </div>
                </div>

            </div>
        </div>
    </div>







 `,
providers: [],



})
export class LoginComponent {


    username = '';
    password = '';

    loginError = {error: false, error_message: ''};

    resetPasswordDialog = false;
    email = '';
    passwordResetResponse: any = {reset_email_sended: false, error: false, error_message: ''};

    ongoingPost = false;

    constructor(private dataService: DataService, public communicationService: CommunicationService, private router: Router) {}



    login() {

        if (this.username && this.password) {

            const credetentials = {
                username: this.username,
                password: this.password
            };

            this.dataService.login(credetentials)
            .subscribe(data => {

                if (data.error === false) {
                    localStorage.auth_token = data.auth_token;
                    this.router.navigate(['/profile']);
                } else {
                    this.loginError = data;
                }

            });
        }
    }







    reset_password() {

        if (this.email) {

            const credetentials = {
                email: this.email,
            };

            this.dataService.reset_password(credetentials)
            .subscribe(data => this.passwordResetResponse = data);
        }
    }





}
