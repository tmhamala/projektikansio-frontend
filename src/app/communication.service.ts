import { Injectable } from '@angular/core';


interface UserData {

    user_id: number;
    name?: string;
    username?: string;
    email?: string;
    info?: string;
    notifications?: any[];
    new_notifications_count?: number;
    avatar_s3_url?: string;
    projects?: any[];
    admin?: boolean;
}



@Injectable()
export class CommunicationService {

    userData: UserData | null = null;

    allProjectsList: any = [];
    challengesList: any = [];

    allProjectsParams = {
        searchTerm: '',
        order: '-latest_step_taken',
        projectsToShow: 'all',
        projectsToShowCount: 20,
    };

    matchingProjectCount = 0;

    showNotifications = false;






    resetData() {
        // clearing local storage
        localStorage.clear();

        // resetting memorydata
        this.userData = null;
    }


}
