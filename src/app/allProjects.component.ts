import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './data.service';
import { CommunicationService } from './communication.service';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';

@Component({
    selector: 'app-all-projects-component',
    templateUrl: './allProjects.component.html',
})


export class AllProjectsComponent implements OnInit, OnDestroy {


    ongoingPost = false;
    searchSubscription: Subscription;

    constructor(private dataService: DataService, public communicationService: CommunicationService) { }





    ngOnInit() {
        this.get_all_projects();
        this.setSearchBoxSubscription();
    }



    setSearchBoxSubscription() {

        const searchBox = document.getElementById('search-box');
        this.searchSubscription = fromEvent(searchBox, 'input').pipe(
            map((e: KeyboardEvent) => (e.target as HTMLTextAreaElement).value),
            filter(e => e.length > 1 || e.length === 0),
            debounceTime(300),
            distinctUntilChanged())
            .subscribe({
                next: searchTerm => {
                    this.communicationService.allProjectsParams.searchTerm = searchTerm;
                    this.get_all_projects();
                }
            });

    }



    get_all_projects() {

        this.dataService.get_all_projects(this.communicationService.allProjectsParams)
            .subscribe(data => {

                this.communicationService.userData = data.userdata;

                if (!data.all_projects_data.error) {
                    this.communicationService.allProjectsList = data.all_projects_data.projects;
                    this.communicationService.matchingProjectCount = data.all_projects_data.matching_project_count;
                }

            });

    }




    ngOnDestroy() {
        this.communicationService.allProjectsParams.searchTerm = '';
        this.searchSubscription.unsubscribe();
    }




}
