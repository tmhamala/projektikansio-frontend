import { Component } from '@angular/core';
import { DataService } from './data.service';
import { CommunicationService } from './communication.service';


@Component({
    selector: 'app-notifications-component',
    template: `


    <div *ngIf="communicationService.showNotifications && communicationService.userData" class="col-xs-12 no-padding">

        <div class="well navigation-bar" style="margin: auto; margin-bottom: 18px; padding-bottom: 11px; z-index: 5; max-width: 1200px; background-color:rgba(255, 255, 255, 0.7);">

            <div align="left" style="display: inline-block; width: 100%; margin-bottom: 10px;">
              <p style="font-size: 16px; font-weight: 600 !important; font-family: 'Montserrat', sans-serif; margin-left: 15px;">VIIMEISIMMÄT TAPAHTUMAT</p>
            </div>


            <div *ngIf="communicationService.userData.notifications.length == 0">
              <h4>Ei näytettäviä tapahtumia</h4>
            </div>




          <div align="left">
            <div *ngFor="let notification of communicationService.userData.notifications" style="outline: none; margin-bottom: 5px; width: 100%; background-color:rgba(0, 0, 0, 0.06); border-radius: 12px; padding: 10px;">

              <div class="row">
                  <div class="col-xs-2">
                      <img style="min-width: 40px; max-height: 60px; max-width: 100%; border: 2px dashed #2dc3e8;  border-radius: 50%;" *ngIf="notification.action_maker_avatar_s3_url" [src]="notification.action_maker_avatar_s3_url"/>
                      <img style="min-width: 40px; max-height: 60px; max-width: 100%; border: 2px dashed #2dc3e8;  border-radius: 50%;" *ngIf="!notification.action_maker_avatar_s3_url" src="assets/img/default.jpg"/>
                  </div>

                  <div class="col-xs-10">
                      <p style="font-size: 10px; display:inline-block; margin-left: 10px; margin-bottom: 5px; font-weight: 600 !important; font-family: 'Montserrat', sans-serif;">{{notification.date | date:"d.M.y klo HH:mm"}}</p>
                      <p *ngIf="notification.new" class="pull-right" style="font-size: 11px; display: inline-block; color: white; background-color: rgba(45, 195, 232, 0.65); padding-left: 7px; padding-right: 7px; border-radius: 4px; font-weight: 600 !important; font-family: 'Montserrat', sans-serif;">NEW</p>

                      <p *ngIf="notification.action == 'step_like_added'" style="line-height: 17px; margin-left: 10px; font-weight: 400 !important; font-family: 'Montserrat', sans-serif;">Käyttäjä <a [routerLink]="'/u/' + notification.action_maker_url_token" (click)="communicationService.showNotifications = false;"><strong>{{notification.action_maker_name}}</strong></a> tykkäsi projektin <a [routerLink]="'/p/' + notification.project_url_token" (click)="communicationService.showNotifications = false;"><strong>{{notification.project_name}}</strong></a> askeleesta <a [routerLink]="['/p/' + notification.project_url_token, { stepId: notification.step_id }]" (click)="communicationService.showNotifications = false;"><strong>{{ notification.step_topic }}</strong></a>.</p>
                      <p *ngIf="notification.action == 'project_like_added'" style="line-height: 17px; margin-left: 10px; font-weight: 400 !important; font-family: 'Montserrat', sans-serif;">Käyttäjä <a [routerLink]="'/u/' + notification.action_maker_url_token" (click)="communicationService.showNotifications = false;"><strong>{{notification.action_maker_name}}</strong></a> tykkäsi projektista <a [routerLink]="'/p/' + notification.project_url_token" (click)="communicationService.showNotifications = false;"><strong>{{notification.project_name}}</strong></a>.</p>
                      <p *ngIf="notification.action == 'password_changed'" style="line-height: 17px; margin-left: 10px; font-weight: 400 !important; font-family: 'Montserrat', sans-serif;">Vaihdoit salasanasi.</p>
                      <p *ngIf="notification.action == 'step_comment_added'" style="line-height: 17px; margin-left: 10px; font-weight: 400 !important; font-family: 'Montserrat', sans-serif;">Käyttäjä <a [routerLink]="'/u/' + notification.action_maker_url_token" (click)="communicationService.showNotifications = false;"><strong>{{notification.action_maker_name}}</strong></a> lisäsi kommentin projektin <a [routerLink]="'/p/' + notification.project_url_token" (click)="communicationService.showNotifications = false;"><strong>{{notification.project_name}}</strong></a> askeleelle <a [routerLink]="['/p/' + notification.project_url_token, { stepId: notification.step_id }]" (click)="communicationService.showNotifications = false;"><strong>{{ notification.step_topic }}</strong></a>.</p>
                  </div>
              </div>
            </div>


            <div style="display: inline-block; width: 100%; margin-bottom: 5px; margin-top: 10px">
              <a (click)="delete_notifications();" class="btn btn-danger btn-xs pull-right">Poista tapahtumat</a>
              <a (click)="mark_notifications_as_read();" style="margin-right: 5px" class="btn btn-azure btn-xs">Piilota tapahtumat</a>
            </div>


        </div>




          <div class="row"></div>
        </div>

    </div>







 `,



})
export class NotificationsComponent {

    constructor(private dataService: DataService, public communicationService: CommunicationService) { }




    delete_notifications() {


        this.dataService.delete_notifications()
            .subscribe(data => {

                this.communicationService.showNotifications = false;

                if (!data.error) {
                    this.communicationService.userData.new_notifications_count = 0;
                    this.communicationService.userData.notifications = [];
                }
            });

    }



    mark_notifications_as_read() {


        this.dataService.mark_notifications_as_read()
            .subscribe(data => {

                this.communicationService.showNotifications = false;

                if (!data.error) {
                    this.communicationService.userData.new_notifications_count = 0;
                }
            });

    }


}

