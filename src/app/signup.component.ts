import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { CommunicationService } from './communication.service';




@Component({
    selector: 'app-signup-component',
    template: `


    <div class="default-container">

        <div class="col-md-12 col-xs-12 no-padding">

            <div class="well default-well">


                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-xs-12">
                        <div class="row">
                            <div class="col-xs-12">
                                <div align="center">

                                <div *ngIf="signupError.error" class="alert alert-danger fade in">
                                    <i class="fa-fw fa fa-times"></i>
                                    <strong>Rekisteröitymisongelma!</strong> {{signupError.error_message}}
                                </div>



                                <h3 align="center" style="margin-bottom: 30px;">Rekisteröidy käyttäjäksi</h3>
                                <div class="well" style="max-width: 600px;">
                                    <div class="form-title">
                                        Käyttäjätiedot
                                    </div>
                                    <div class="form-group">
                                        <span class="input-icon icon-right">
                                            <input [(ngModel)]="username" type="text" class="form-control" id="userameInput" placeholder="Käyttäjänimi">
                                            <i class="glyphicon glyphicon-user circular"></i>
                                        </span>
                                    </div>
                                    <div class="form-group">
                                        <span class="input-icon icon-right">
                                            <input [(ngModel)]="password" type="password" class="form-control" id="passwordInput" placeholder="Salasana">
                                            <i class="fa fa-lock circular"></i>
                                        </span>
                                    </div>
                                    <div class="form-group">
                                        <span class="input-icon icon-right">
                                            <input [(ngModel)]="passwordConfirm" type="password" class="form-control" id="confirmPasswordInput" placeholder="Salasana uudelleen">
                                            <i class="fa fa-lock circular"></i>
                                        </span>
                                    </div>

                                    <hr class="wide">
                                    <button [class.disabled]="ongoingPost || password != passwordConfirm || !username || password.length < 6" (click)="signup()" class="btn btn-blue"><span><i *ngIf="ongoingPost" class='fa fa-spinner fa-spin fa-fw'></i> Rekisteröidy</span></button>

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
export class SignupComponent {


    username = '';
    email = '';
    password = '';
    passwordConfirm = '';
    signupError = { error: false, error_message: '' };

    ongoingPost = false;


    constructor(private dataService: DataService,  private router: Router) { }





    signup() {


        const credetentials = {
            username: this.username,
            email: this.email,
            password: this.password,
            password_confirm: this.passwordConfirm,
        };

        this.ongoingPost = true;

        this.dataService.signup(credetentials)
            .subscribe(data => {

                this.ongoingPost = false;

                if (data.error === false) {
                    localStorage.auth_token = data.auth_token;
                    this.router.navigate(['/profile']);
                } else {
                    this.signupError = data;
                }

            });


    }






}
