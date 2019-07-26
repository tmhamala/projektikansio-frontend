import { Component, OnInit} from '@angular/core';
import {DataService} from './data.service';
import {CommunicationService} from './communication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-challenges-component',
  templateUrl: './challenges.component.html',
})

export class ChallengesComponent implements OnInit {


    startChallengeResponse: any;
    categories: any;
    selectedCategory: '';

    challengesToShow = [];


    constructor(public dataService: DataService, public communicationService: CommunicationService, private router: Router) {}

    ngOnInit() {


        this.dataService.get_challenges()
        .subscribe(data => {
            this.communicationService.challengesList = data.challenges;
            this.communicationService.userData = data.userdata;
            this.categories = data.categories.filter((category) => category != null);
            if (this.categories.length > 0) {
                this.selectedCategory = this.categories[0];
            }
            this.select_category();
        });
    }



    select_category() {

        if (this.selectedCategory) {
            this.challengesToShow = this.communicationService.challengesList.filter((challenge) => challenge.category === this.selectedCategory);
        } else {
            this.challengesToShow = this.communicationService.challengesList;
        }

    }


    start_challenge(challengeId: number) {

        const credetentials = {
            challenge: true,
            challenge_id: challengeId,
        };

        this.dataService.start_new_project(credetentials)
        .subscribe(data => {
            this.startChallengeResponse = data;
            if (this.startChallengeResponse.challenge_started) {
                this.router.navigate(['/p/' + this.startChallengeResponse.project_url_token]);
            }

        });


    }



}
