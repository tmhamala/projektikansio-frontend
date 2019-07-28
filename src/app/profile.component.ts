import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { CommunicationService } from './communication.service';
import { Router } from '@angular/router';




@Component({
    selector: 'app-profile-component',
    templateUrl: './profile.component.html',

})


export class ProfileComponent implements OnInit {


    imageEdit = false;
    deleteAccountConfirm = false;
    deleteAccountPasswordConfirm: string;
    deleteAccountResponse: any = { error: false, error_message: null };
    slimdata: any;
    slimdataProfilepic: any;


    newProjectName: string;
    newProjectDescription: string;

    addNewProjectDialog = false;

    slimOptions = {
        ratio: '1:1',
        download: false,
        size: '400, 400',
        push: true,
        label: 'Use drag and drop or click to add profile pic',
        uploadBase64: true,
        service: this.slimService.bind(this),
        didInit: this.slimInit.bind(this),
    };


    slimOptionsNewProjectCover = {
        ratio: '3:1',
        download: false,
        size: '1200, 400',
        push: false,
        label: 'Use drag and drop or click to add cover photo for the project',
        uploadBase64: true,
        service: null,
        didInit: this.slimInitNewProjectCover.bind(this),
    };




    constructor(private dataService: DataService, public communicationService: CommunicationService, private router: Router) {
    }


    ngOnInit() {
        this.get_profiledata();
    }





    // called when slim has initialized
    slimInit(data: any, slim: any) {
        // slim instance reference
        // console.log(slim);

        // current slim data object and slim reference
        this.slimdataProfilepic = slim;
    }



    // called when upload button is pressed or automatically if push is enabled
    slimService(formdata: any, progress: any, success: any, failure: any, slim: any) {


        const credetentials = {

            edited_data: 'new_profilepic',
            profile_pic_base64: this.slimdataProfilepic.dataBase64.output.image,
            profile_pic_name: this.slimdataProfilepic.dataBase64.output.name,

        };


        this.dataService.save_profiledata(credetentials)
            .subscribe(data => {
                this.communicationService.userData = data;
                success();
            });



    }





    // called when slim has initialized
    slimInitNewProjectCover(data: any, slim: any) {
        // slim instance reference
        // console.log(slim);

        // current slim data object and slim reference
        this.slimdata = slim;
    }





    delete_account() {

        const credetentials = {
            password: this.deleteAccountPasswordConfirm,

        };

        this.dataService.delete_account(credetentials)
            .subscribe(data => {
                this.deleteAccountResponse = data;
                if (!data.error) {
                    this.communicationService.resetData();
                    this.router.navigate(['/']);
                }

            });

    }




    remove_avatar() {

        const credetentials = {
            edited_data: 'avatar_removed',
        };

        this.imageEdit = false;

        this.dataService.save_profiledata(credetentials)
            .subscribe(data => {
                this.get_profiledata();
            });

    }



    logout() {
        this.communicationService.resetData();
        this.router.navigate(['/']);
    }


    save_profiledata() {

        const credetentials = {

            edited_data: 'textdata',
            name: this.communicationService.userData.name,
            email: this.communicationService.userData.email,
            info: this.communicationService.userData.info,

        };

        this.dataService.save_profiledata(credetentials)
            .subscribe(data => {});

    }


    get_profiledata() {

        this.dataService.get_profiledata()
            .subscribe(data => {

                if (!data.error) {
                    this.communicationService.userData = data.userdata;
                }

            });

    }






    start_new_project() {


        const credetentials = {
            challenge: false,
            project_name: this.newProjectName,
            project_info: this.newProjectDescription,
            project_cover_photo_base64: this.slimdata.dataBase64.output.image,
            project_cover_photo_name: this.slimdata.dataBase64.output.name,
        };


        this.dataService.start_new_project(credetentials)
            .subscribe(data => {

                if (!data.error) {
                    this.get_profiledata();
                    this.addNewProjectDialog = false;
                    this.newProjectName = '';
                    this.newProjectDescription = '';
                }


            });


    }



}
