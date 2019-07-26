import { Component } from '@angular/core';
import { CommunicationService } from './communication.service';


@Component({
    selector: 'app-navigationbar-component',
    template: `

    <div class="row" style="margin: 0">
        <div class="col-xs-12" style="padding-left: 0px; padding-right: 0px;">

            <div class="well navigation-bar" style="margin: auto; margin-top: 18px; margin-bottom: 18px; padding-bottom: 11px; z-index: 5; max-width: 1200px; background-color:rgba(255, 255, 255, 0.7);">

                <div style="text-align: center; display: inline-block; width: 100%;">

                    <a [routerLinkActive]="['navigation-button-selected']" [routerLinkActiveOptions]="{exact: true}" routerLink="/" class="btn btn-default navigation-button">Projektit</a>
                    <a [routerLinkActive]="['navigation-button-selected']"  routerLink="/challenges" class="btn btn-default navigation-button">Haasteet</a>
                    <a [routerLinkActive]="['navigation-button-selected']" *ngIf="!communicationService.userData" routerLink="/login" class="btn btn-default navigation-button">Kirjaudu / Rekisteröidy</a>
                    <a [routerLinkActive]="['navigation-button-selected']" *ngIf="communicationService.userData" routerLink="/profile" class="btn btn-default navigation-button">Profiili</a>
                    <a [routerLinkActive]="['navigation-button-selected']" routerLink="/faq" class="btn btn-default navigation-button">UKK</a>



                    <ng-container *ngIf="communicationService.userData && communicationService.userData?.new_notifications_count > 0">
                        <div (click)="communicationService.showNotifications = !communicationService.showNotifications;" class="notification-effect navigation-button hidden-sm hidden-md hidden-lg" style="width: 38px; height: 38px;">{{ communicationService.userData.new_notifications_count }}</div>
                        <div (click)="communicationService.showNotifications = !communicationService.showNotifications;" class="pull-right notification-effect navigation-button hidden-xs" style="width: 38px; height: 38px;">{{ communicationService.userData.new_notifications_count }}</div>
                    </ng-container>

                </div>


            </div>

        </div>
    </div>









 `,

})
export class NavigationbarComponent {

    constructor(public communicationService: CommunicationService) { }

}

