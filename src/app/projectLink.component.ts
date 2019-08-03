import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/fi';

@Component({
  selector: 'app-project-link',
  template: `


  <a routerLink="/p/{{project.url_token}}" style="text-decoration: none;">

    <div class="well no-padding" style="cursor: pointer; min-height: 370px;">

      <div style="width: 100%; padding-top: 33.3%; position: relative;">
          <img *ngIf="project.cover_photo_s3_url" style="position: absolute; top: 0; left: 0; width: 100%"  [src]="project.cover_photo_s3_url"/>
          <img *ngIf="!project.cover_photo_s3_url" style="position: absolute; top: 0; left: 0; width: 100%" src="assets/img/cover-default.png"/>
      </div>

      <img *ngIf="project.project_owner_avatar" class="project-link-avatar"  [src]="project.project_owner_avatar"/>
      <img *ngIf="!project.project_owner_avatar" class="project-link-avatar" src="assets/img/default.jpg"/>

      <div style="text-align: center; height: 15px; margin-top: 9px; width: 33%; display: inline-block;">
        <i *ngIf="project.like_count && project.project_likes_allowed" style="font-size: 14px; color: #2dc3e8; margin-right: 3px;" class="fa fa-heart"></i>
        <h5 *ngIf="project.like_count && project.project_likes_allowed" style="font-weight: 700 !important; font-size: 14px; font-family: 'Montserrat', sans-serif; display: inline-block;"> {{ project.like_count }}</h5>
      </div>

      <div *ngIf="project.status == 'ready'" style="text-align: center; height: 15px; margin-top: 9px; margin-left: 33%; width: 33%; display: inline-block;">
          <i *ngIf="project.like_count" style="font-size: 12px; color: #4BB543; margin-right: 3px;" class="fa fa-check-circle"></i>
          <h5 *ngIf="project.like_count" style="font-weight: 700 !important; font-size: 12px; font-family: 'Montserrat', sans-serif; display: inline-block;"> Valmis</h5>
      </div>

      <div *ngIf="project.status == 'cancelled'" style="text-align: center; height: 15px; margin-top: 9px; margin-left: 33%; width: 33%; display: inline-block;">
          <i *ngIf="project.like_count" style="font-size: 11px; color: #B33A3A; margin-right: 3px;" class="fa fa-times-circle"></i>
          <h5 *ngIf="project.like_count" style="font-weight: 700 !important; font-size: 11px; font-family: 'Montserrat', sans-serif; display: inline-block;"> Keskeytetty</h5>
      </div>


      <div style="text-align: center; margin-top: calc(15% - 17px);">

        <h6 style="margin-bottom: 15px;">{{ project.project_owner_name }}</h6>
        <h4 style="padding-left: 10px; padding-right: 10px; line-height: 25px; margin-bottom: 20px; height: 70px;">{{project.name}}</h4>

        <p *ngIf="!project.complete_percentage"  style="margin-bottom: 3px; font-size: 20px; font-family: 'Montserrat', sans-serif; color: #2dc3e8">{{ project.step_count }}</p>
        <h6 *ngIf="!project.complete_percentage"  style="margin-bottom: 20px;">askelta otettu</h6>

        <p *ngIf="project.complete_percentage"  style="margin-bottom: 3px; font-size: 20px; font-family: 'Montserrat', sans-serif; color: #2dc3e8">{{ project.complete_percentage | number : '1.0-1' }} %</p>
        <h6 *ngIf="project.complete_percentage" style="margin-bottom: 20px;">projektista suoritettu</h6>


        <div *ngIf="lastUpdateString">
          <h6 style="margin-bottom: 0px;">Päivitetty</h6>
          <p style="margin-bottom: 15px;">{{ lastUpdateString }}</p>
        </div>

      </div>

      <div class="row"></div>
    </div>

  </a>


 `,


})


export class ProjectLinkComponent implements OnInit {

  @Input() project: any;

  lastUpdateString: string;

  ngOnInit() {

    moment.locale('fi');

    if (this.project.latest_step_taken_isoformat) {
      this.lastUpdateString = moment(this.project.latest_step_taken_isoformat).fromNow();
    }
  }



}
