import { Component, Input } from '@angular/core';
import { DataService } from './data.service';
import { CommunicationService } from './communication.service';



@Component({
    selector: 'app-comment-section-component',
    template: `



    <div class="col-xs-12 no-padding step-data-column">

        <div style="text-align: center;">
            <h4 (click)="showComments = !showComments" style="font-style: italic; display: inline-block; color: #159bbc; cursor: pointer; font-weight: 500 !important; margin-bottom: 20px; margin-top: 20px;">
                <ng-container *ngIf="step.comments.length > 0 && !showComments">Näytä kommentit ({{step.comments.length}} kommenttia)</ng-container>
                <ng-container *ngIf="step.comments.length > 0 && showComments">Piilota kommentit ({{step.comments.length}} kommenttia)</ng-container>
                <ng-container *ngIf="step.comments.length == 0 && communicationService.userData">Ei kommentteja - Ole ensimmäinen!</ng-container>
                <ng-container *ngIf="step.comments.length == 0 && !communicationService.userData">Ei kommentteja</ng-container>
            </h4>
        </div>


        <div *ngIf="showComments">
            <div *ngFor="let comment of step.comments">


                <div style="background-color:rgba(255, 255, 255, 0.3); border-radius: 8px; margin-bottom: 10px; padding: 6px;">

                    <div style="max-width: 60px; width: 100%; display: inline-block;">
                        <img routerLink="/u/{{comment.user_url_token}}" align="center" style="outline: none; cursor: pointer; width: 100%; border: 2px dashed #2dc3e8;  border-radius: 50%;" *ngIf="comment.user_avatar_s3_url" [src]="comment.user_avatar_s3_url"/>
                        <img routerLink="/u/{{comment.user_url_token}}" align="center" style="outline: none; cursor: pointer; width: 100%; border: 2px dashed #2dc3e8;  border-radius: 50%;" *ngIf="!comment.user_avatar_s3_url" src="assets/img/default.jpg"/>
                    </div>

                    <div style="display: inline-block; vertical-align: top; width: calc(100% - 90px);">
                        <p style=" font-size: 14px; margin-left: 10px; display: inline-block; font-weight: 700 !important;">{{ comment.user_name }} <span class="hidden-sm hidden-md hidden-lg"> - {{ comment.date }}</span></p>

                        <p class="pull-right hidden-xs" style="vertical-align: top; font-size: 14px; margin-left: 10px; display: inline-block; font-weight: 700 !important;">{{ comment.date }}</p>

                        <div class="row"></div>
                        <p style="vertical-align: top; font-size: 14px; margin-left: 10px; display: inline-block;">{{ comment.comment }}</p>
                    </div>

                    <div style="display: inline-block; vertical-align: top; width: 16px);">
                        <i *ngIf="communicationService.userData.user_id == comment.user_id || communicationService.userData.user_id == projectOwnerId" (click)="comment.delete_confirm = true;" style="font-size: 16px; color: red; margin-top: 2px; cursor: pointer;" class='pull-right fa fa-times'></i>
                     </div>


                    <div align="center" *ngIf="comment.delete_confirm">
                        <hr>
                        <h5>Haluatko varmasti poistaa tämän kommentin?</h5>
                        <button (click)="deleteComment(comment.comment_id)" style="margin-top: 3px; margin-bottom: 15px;" class="btn btn-sm btn-danger">Poista</button>
                    </div>

                </div>

            </div>








            <div *ngIf="communicationService.userData" style="background-color:rgba(255, 255, 255, 0.3); border-radius: 8px; margin-bottom: 10px; padding: 10px 6px 6px 6px;">
                <div style="max-width: 60px; width: 100%; display: inline-block;">
                    <img align="center" style="width: 100%; border: 2px dashed #2dc3e8;  border-radius: 50%;" *ngIf="communicationService.userData.avatar_s3_url" [src]="communicationService.userData.avatar_s3_url"/>
                    <img align="center" style="width: 100%; border: 2px dashed #2dc3e8;  border-radius: 50%;" *ngIf="!communicationService.userData.avatar_s3_url" src="assets/img/default.jpg"/>
                </div>

                <div style="display: inline-block; vertical-align: top; width: calc(100% - 80px);">
                    <textarea maxlength="500" [(ngModel)]="comment" class="form-control input-lg" rows="2"  style="resize: vertical; min-height: 70px; margin-top: 2px; margin-left: 10px; border-radius: 5px !important;" placeholder="Jätä kommentti"></textarea>
                    <button (click)="sendComment()" style="margin-top: 7px; margin-bottom: 10px;" class="btn btn-sm btn-blue pull-right"><span><i *ngIf="ongoingPost" class='fa fa-spinner fa-spin fa-fw'></i> Lähetä</span></button>
                </div>
            </div>




        </div>











        <div class="row"></div>

    </div>





 `,
    providers: [],




})
export class CommentSectionComponent {


    @Input() step: any;
    @Input() projectOwnerId: number;


    addComment = false;
    comment = '';
    showComments = false;
    ongoingPost = false;

    constructor(public dataService: DataService, public communicationService: CommunicationService) { }



    sendComment() {

        const credetentials = {
            comment: this.comment,
        };


        this.ongoingPost = true;

        this.dataService.add_step_comment(credetentials, this.step.id)
            .subscribe(data => {

                this.ongoingPost = false;

                if (!data.error) {
                    this.comment = '';
                    this.step.comments = data.comments;
                }


            });



    }







    deleteComment(commentId: number) {


        this.dataService.delete_step_comment(this.step.id, commentId)
            .subscribe(data => {

                if (!data.error) {
                    this.step.comments = data.comments;
                }


            });



    }








}



