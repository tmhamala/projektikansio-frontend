import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from './data.service';
import { CommunicationService } from './communication.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-project-component',
    templateUrl: './project.component.html',



})
export class ProjectComponent implements OnInit {

    tahtiarvostelu: number;


    project: any;
    stepsToShow = 10;
    searchTerm = '';

    ongoingPost = false;

    urlToken: string;
    selectedStep = null;
    addNewStepDialog = false;
    newStep: any = { topic: null, description: null, proof_image_slim: null, numeric_value: null, rating: null };
    newStepResponse: any = { data_loaded: true, step_added: false, error: false, error_message: null };
    newStepImageAdded = false;





    deleteProjectConfirm = false;


    constructor(public dialog: MatDialog, public dataService: DataService, public communicationService: CommunicationService, private route: ActivatedRoute, private router: Router) {

    }



    slimOptions = {
        download: false,
        size: '800, 800',
        push: true,
        label: 'Raahaa ja pudota kuva tai klikkaa tästä',
        uploadBase64: true,
        // didUpload: this.profilePicUploaded.bind(this),
        service: null,
        didSave: this.imageAdded.bind(this),
        didInit: this.slimInit.bind(this),
        didRemove: this.imageRemoved.bind(this),
    };


    slimOptionsCoverPhoto = {
        ratio: '3:1',
        download: false,
        size: '1200, 400',
        label: 'Use drag and drop or click to add cover photo for the project',
        uploadBase64: true,
        service: null,
        didInit: this.slimInitCoverPhoto.bind(this),
    };


    // called when slim has initialized
    slimInit(data: any, slim: any) {
        this.newStep.proof_image_slim = slim;
    }


    slimInitCoverPhoto(data: any, slim: any) {
        this.project.slim_cover_photo = slim;
    }


    imageAdded() {
        this.newStepImageAdded = true;

    }




    imageRemoved() {
        this.newStepImageAdded = false;

    }

    // called when upload button is pressed or automatically if push is enabled
    slimService(formdata: any, progress: any, success: any, failure: any, slim: any) {

        this.newStepImageAdded = true;



    }



    ngOnInit() {

        let parametrit;

        this.route.params
            .subscribe(params => parametrit = params);

        this.urlToken = parametrit.url_token;
        this.selectedStep = parametrit.stepId;

        this.getProjectData();


    }









    getProjectData() {

        const params = {
            steps_to_show: this.stepsToShow,
            search_term: this.searchTerm
        };

        this.dataService.get_project_data(params, this.urlToken)
            .subscribe(data => {
                this.project = data.projectdata;
                this.communicationService.userData = data.userdata;

                // // Haetaan lazy loading tyyliin kaikki askeleet
                // credetentials.only_10_steps = false;
                // this.dataService.get_project_data(credetentials)
                //     .subscribe(alldata => {
                //         this.project = alldata.projectdata;
                //         this.communicationService.userData = alldata.userdata;
                //     });


            });

    }






    save_new_step() {

        const credetentials = {

            project_id: this.project.id,

            step_topic: this.newStep.topic,
            step_description: this.newStep.description,
            step_rating: this.newStep.rating,
            step_numeric_value: this.newStep.numeric_value,
            proof_image_base64: this.newStep.proof_image_slim.dataBase64.output.image,
            proof_image_name: this.newStep.proof_image_slim.dataBase64.output.name,
        };


        this.ongoingPost = true;


        this.dataService.add_step(credetentials)
            .subscribe(data => {
                this.ongoingPost = false;
                this.newStep = { topic: null, description: null, proof_image_slim: null };
                this.addNewStepDialog = false;
                this.getProjectData();
            });

    }















    save_edited_project() {


        let coverPhotoData;


        if (this.project.slim_cover_photo === undefined) {
            coverPhotoData = {
                project_new_coverphoto_image_base64: null,
                project_new_coverphoto_image_name: null,
            };
        } else {
            coverPhotoData = {
                project_new_coverphoto_image_base64: this.project.slim_cover_photo.dataBase64.output.image,
                project_new_coverphoto_image_name: this.project.slim_cover_photo.dataBase64.output.name,
            };
        }


        const credetentials = {
            user_id: this.communicationService.userData.user_id,

            project_id: this.project.id,

            project_name: this.project.name_edit,
            project_description: this.project.description_edit,
            project_goal: this.project.goal_edit,
            project_step_goal: this.project.step_goal_edit,
            project_numeric_goal: this.project.numeric_goal_edit,
            project_numeric_goal_unit: this.project.numeric_goal_unit_edit,
            project_step_ratings: this.project.step_ratings_edit,
            project_status: this.project.status_edit,
            project_likes_allowed: this.project.project_likes_allowed_edit,
            project_step_likes_allowed: this.project.step_likes_allowed_edit,
            project_step_comments_allowed: this.project.step_comments_allowed_edit,
            project_coverphoto_data: coverPhotoData,
            project_certificated: this.project.certificated_project_edit,
            project_time_limit: this.project.time_limit_edit,
            project_time_limit_days: this.project.time_limit_days_edit,
            project_order_number: this.project.order_number_edit,
            project_category: this.project.category_edit,
        };


        this.dataService.edit_project(credetentials, this.urlToken)
            .subscribe(data => {
                this.getProjectData();
            });

    }







    add_like() {

        const credetentials = {
            user_id: this.communicationService.userData.user_id,
            project_id: this.project.id,
        };

        this.project.like_count = this.project.like_count + 1;

        this.dataService.add_projectlike(credetentials)
            .subscribe(data => {
                if (!data.error) {
                    this.project.likers = data.likers;
                }
            });

    }



    remove_like() {

        const credetentials = {
            user_id: this.communicationService.userData.user_id,
            project_id: this.project.id,
        };

        this.project.like_count = this.project.like_count - 1;

        this.dataService.remove_projectlike(credetentials)
            .subscribe(data => {
                if (!data.error) {
                    this.project.likers = data.likers;
                }
            });

    }













    delete_project() {

        this.dataService.delete_project(this.urlToken)
            .subscribe(data => this.router.navigate(['/profile']));

    }






    openPopUpImageDialog(imageUrl: string): void {

        const dialogRef = this.dialog.open(PopUpImageDialogComponent, {
            data: {
                imageUrl,
            },
        });

    }



    openProjectLikersDialog(likers: any): void {
        const dialogRef = this.dialog.open(ProjectLikersDialogComponent, {
            data: { likers },
        });

    }



    openStepLikersDialog(data: any): void {

        const dialogRef = this.dialog.open(StepLikersDialogComponent, {
            data: { step_topic: data.step_topic, step_id: data.step_id, likers: data.likers },
        });

    }





}







@Component({
    selector: 'pop-up-image-dialog',
    template: `

      <img style="max-width: 100%" [src]="data.image_url">

  `
})
export class PopUpImageDialogComponent {

    constructor(public dataService: DataService, public dialogRef: MatDialogRef<PopUpImageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}



@Component({
    selector: 'project-likers-dialog',
    template: `

        <h3 style="width: 100%; margin-top: 0px; margin-bottom: 40px; font-weight: 700 !important; font-family: 'Montserrat', sans-serif;" align="center">Projektista tykänneet</h3>

        <div align="center">
            <div (click)="onNoClick()" routerLink="/u/{{liker.liker_url_token}}" *ngFor="let liker of data.likers" style="cursor: pointer; outline: none; margin-bottom: 5px; width: 100%; background-color:rgba(0, 0, 0, 0.06); border-radius: 12px; padding: 10px;">
                <img style="width: 50px; border: 2px dashed #2dc3e8;  border-radius: 50%;" *ngIf="liker.liker_avatar_s3_url" [src]="liker.liker_avatar_s3_url"/>
                <img style="width: 50px; border: 2px dashed #2dc3e8;  border-radius: 50%;" *ngIf="!liker.liker_avatar_s3_url" src="assets/img/default.jpg"/>

                <h4 style="display:inline-block; margin-left: 20px; font-weight: 600 !important; font-family: 'Montserrat', sans-serif;">{{liker.liker_name}}</h4>
            </div>
        </div>

        <h4 (click)="onNoClick()" style="max-width: 100%; margin-top: 40px; margin-bottom: 10px; font-weight: 700 !important; font-family: 'Montserrat', sans-serif; cursor: pointer;" align="right"><i style="font-size: 22px; margin-right: 6px;" class='fa fa-times'></i>Sulje</h4>

    `
})
export class ProjectLikersDialogComponent {

    constructor(public dataService: DataService, public dialogRef: MatDialogRef<PopUpImageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}





@Component({
    selector: 'step-likers-dialog',
    template: `

        <h3 style="max-width: 100%; margin-top: 0px; margin-bottom: 40px; font-weight: 700 !important; font-family: 'Montserrat', sans-serif;" align="center">Askeleesta {{data.step_topic}} tykänneet</h3>

        <div align="center">
            <div (click)="onNoClick()" routerLink="/u/{{liker.liker_url_token}}" *ngFor="let liker of data.likers" style="cursor: pointer; outline: none; width: 100%; margin-bottom: 5px; max-width: 100%; background-color:rgba(0, 0, 0, 0.06); border-radius: 12px; padding: 10px;">
                <img style="width: 50px; border: 2px dashed #2dc3e8;  border-radius: 50%;" *ngIf="liker.liker_avatar_s3_url" [src]="liker.liker_avatar_s3_url"/>
                <img style="width: 50px; border: 2px dashed #2dc3e8;  border-radius: 50%;" *ngIf="!liker.liker_avatar_s3_url" src="assets/img/default.jpg"/>

                <h4 style="display:inline-block; margin-left: 20px; font-weight: 600 !important; font-family: 'Montserrat', sans-serif;">{{liker.liker_name}}</h4>
            </div>
        </div>

        <h4 (click)="onNoClick()" style="max-width: 100%; margin-top: 40px; margin-bottom: 10px; font-weight: 700 !important; font-family: 'Montserrat', sans-serif; cursor: pointer;" align="right"><i style="font-size: 22px; margin-right: 6px;" class='fa fa-times'></i>Sulje</h4>

    `
})
export class StepLikersDialogComponent {

    constructor(public dataService: DataService, public dialogRef: MatDialogRef<PopUpImageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }


}
