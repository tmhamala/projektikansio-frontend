import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { ActivatedRoute } from '@angular/router';

@Component({


    selector: 'app-user-component',
    template: `


  <div style="default-data-container">




    <div *ngIf="user" class="col-md-12 col-xs-12" style="padding-left: 0; padding-right: 0px;">




      <div class="well" style="padding-bottom: 40px; z-index: 5; background-color:rgba(255, 255, 255, 0.7);">

        <h3 align="center" style="margin-bottom: 30px;">Käyttäjä - {{user.username}}</h3>

        <div class="col-xs-12 col-sm-6">
          <div align="center" style="margin-bottom: 30px;">
              <img *ngIf="user.avatar_s3_url" style="border: 2px dashed #2dc3e8; width: 70%; border-radius: 50%;" [src]="user.avatar_s3_url"/>
              <img *ngIf="!user.avatar_s3_url" style="border: 2px dashed #2dc3e8; width: 70%; border-radius: 50%;" src="assets/img/default.jpg"/>
          </div>
        </div>


        <div class="col-xs-12 col-sm-6">
          <label style="margin-bottom: 0px; margin-top: 20px; font-weight: bold;">Nimi</label>
          <h3 style="margin-bottom: 30px;">{{user.name}}</h3>

          <label style="margin-bottom:10px; font-weight: bold;">Kuvaus</label>
          <h4>{{user.info}}</h4>
        </div>

        <div class="row"></div>


      </div>




      <div class="well" style="min-height: 400px; z-index: 5; background-color:rgba(255, 255, 255, 0.5); border-radius: 2%;">
        <h3 style="margin-bottom: 40px;" align="center">Käyttäjän {{user.name}} projektit</h3>


          <div *ngFor="let project of user.projects" class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
              <app-project-link [project]="project"></app-project-link>
          </div>

        <div class="row"></div>
      </div>



    </div>


  </div>



 `,


})
export class UserComponent implements OnInit {


    user: any;

    constructor(public dataService: DataService, private route: ActivatedRoute) {

    }




    ngOnInit() {

        document.body.scrollTop = document.documentElement.scrollTop = 0;

        let parametrit;

        this.route.params
            .subscribe(params => parametrit = params);

        this.getUserData(parametrit.url_token);
    }



    getUserData(urlToken: string) {

        this.dataService.get_user_data(urlToken)
            .subscribe(data => this.user = data);

    }



}
