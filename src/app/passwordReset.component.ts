import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { CommunicationService } from './communication.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-password-reset-component',
    template: `

<div class="page-body no-padding">

    <div style="margin: auto; max-width:1200px; z-index: 100;">

        <div class="col-md-12 col-xs-12" style="padding-left: 0; padding-right: 0px;">

            <div class="well" style="min-height: 800px; z-index: 5; background-color:rgba(255, 255, 255, 0.7);">


                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-xs-12">
                        <div class="row">
                            <div class="col-xs-12">
                                <div align="center">


                                    <div *ngIf="changePasswordResponse?.error" class="alert alert-danger fade in">
                                        <i class="fa-fw fa fa-times"></i>
                                        <strong>Ongelma!</strong> {{changePasswordResponse?.error_message}}
                                    </div>



                                    <h3 style="margin-bottom: 30px;" align="center">Salasanan resetointi - {{ validityResponse?.username }}</h3>
                                    <div class="well" style="max-width: 600px;">

                                        <div class="form-title">
                                            Uusi salasana
                                        </div>

                                        <div class="form-group">
                                            <span class="input-icon icon-right">
                                                <input [(ngModel)]="password" type="password" class="form-control" id="passwordInput" placeholder="Salasana">
                                                <i class="fa fa-lock circular"></i>
                                            </span>
                                        </div>

                                        <div class="form-group">
                                            <span class="input-icon icon-right">
                                                <input [(ngModel)]="passwordAgain" type="password" class="form-control" id="passwordInput" placeholder="Salasana uudelleen">
                                                <i class="fa fa-lock circular"></i>
                                            </span>
                                        </div>

                                        <hr class="wide">
                                        <button [class.disabled]="password != passwordAgain || password.length < 7" (click)="change_password()" class="btn btn-blue"> Vaihda salasana</button>

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
export class PasswordResetComponent implements OnInit {


    password = '';
    passwordAgain = '';
    urlToken: string;

    validityResponse: any = { token_valid: false, error: false, error_message: '', username: null };
    changePasswordResponse: any = { password_changed: false, error: false, error_message: '' };

    constructor(private dataService: DataService, public communicationService: CommunicationService, private router: Router, private route: ActivatedRoute) { }


    ngOnInit() {


        let parametrit;

        this.route.params
            .subscribe(params => parametrit = params);

        this.urlToken = parametrit.url_token;



        const credetentials = {
            url_token: this.urlToken
        };


        this.dataService.check_password_reset_token_validity(credetentials)
            .subscribe(data => {
                this.validityResponse = data;
                if (this.validityResponse.token_valid === false) {
                    this.router.navigate(['/']);
                }

            });



    }









    change_password() {



        const credetentials = {
            url_token: this.urlToken,
            password: this.password
        };


        this.dataService.change_password(credetentials)
            .subscribe(data => {
                this.changePasswordResponse = data;
                if (this.changePasswordResponse.password_changed === true) {
                    this.communicationService.userData = this.changePasswordResponse.login_data;
                    this.router.navigate(['/profile']);
                }

            });



    }












}
