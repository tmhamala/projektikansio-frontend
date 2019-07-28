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

    constructor(public dataService: DataService, public communicationService: CommunicationService) {}


    ngOnInit() {

        if (this.selectedStep) {
            this.fullView = true;
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
            this.refreshProjectData.emit();
        });

    }






    add_like() {

        this.step.like_count = this.step.like_count + 1;

        this.dataService.add_steplike(this.step.id)
        .subscribe(data => {
            if (!data.error) {
                this.step.likers = data.likers;
                this.step.my_like_id = data.my_like_id;
            }
        });

    }




    remove_like() {

        this.step.like_count = this.step.like_count - 1;

        this.dataService.remove_steplike(this.step.id, this.step.my_like_id)
        .subscribe(data => {
            if (!data.error) {
                this.step.likers = data.likers;
            }
        });

    }





}



