import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {DataService} from './data.service';
import {CommunicationService} from './communication.service';


@Component({
  selector: 'app-step-component',
  templateUrl: './step.component.html',


})
export class StepComponent implements OnInit {

    @Input() step: any;
    @Input() project: any;
    @Input() selectedStep: any;
    @Output() refreshProjectData = new EventEmitter<string>();
    @Output() openImagePopUp = new EventEmitter<string>();
    @Output() openStepLikers = new EventEmitter<string>();

    fullView = false;

    ongoingPost = false;

    myLikeId = null;

    constructor(public dataService: DataService, public communicationService: CommunicationService) {}


    ngOnInit() {

        if (this.selectedStep) {
            this.fullView = true;
        }

        this.check_if_liked();

    }



    check_if_liked() {
        if (this.communicationService.userData) {
            const myLike = this.step.likers.find((like) => like.liker_id === this.communicationService.userData.user_id);

            if (myLike) {
                this.myLikeId = myLike.id;
            } else {
                this.myLikeId = null;
            }
        }
    }



    save_edited_step() {

        const credetentials = {
            step: this.step,
        };



        this.dataService.edit_step(credetentials, this.step.id)
        .subscribe(data => {

            if (!data.error) {
                this.step.edit = false;
                this.step.topic = this.step.topic_edit;
                this.step.description = this.step.description_edit;
                this.step.rating = this.step.rating_edit;
                this.step.numeric_value = this.step.numeric_value_edit;
            }
        });


    }




    delete_step(stepId: number) {

        this.dataService.delete_step(stepId)
        .subscribe(data => {
            if (!data.error) {
                this.refreshProjectData.emit();
            }

        });

    }






    add_like() {

        this.dataService.add_steplike(this.step.id)
        .subscribe(data => {
            if (!data.error) {
                this.step.likers = data.likers;
                this.check_if_liked();
            }
        });

    }




    remove_like() {

        this.dataService.remove_steplike(this.step.id, this.myLikeId)
        .subscribe(data => {
            if (!data.error) {
                this.step.likers = data.likers;
                this.check_if_liked();
            }
        });

    }





}



