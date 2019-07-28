import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';


@Injectable()
export class DataService {


    baseurl = '';


    constructor(private http: HttpClient) {
        this.valitse_baseurl();
    }




    valitse_baseurl() {

        if (environment.production) {
            this.baseurl = 'https://api.projektikansio.fi/';
        } else {
            this.baseurl = 'http://127.0.0.1:8000/';
        }

   }




   // LOGIN

    login(credetentials): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers };
        return this.http.post(this.baseurl + 'login/', credetentials, options);
    }


    // PASSWORD RESET

    reset_password(credetentials): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers };
        return this.http.post(this.baseurl + 'reset-password-request/', credetentials, options);
    }


    check_password_reset_token_validity(credetentials): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers };
        return this.http.post(this.baseurl + 'check-password-reset-token-validity/', credetentials, options);
    }


    change_password(credetentials): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers };
        return this.http.post(this.baseurl + 'change-password/', credetentials, options);
    }





    // PROFILE

    signup(credetentials): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers };
        return this.http.post(this.baseurl + 'profile/', credetentials, options);
    }

    get_profiledata(): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token });
        const options = { headers };
        return this.http.get(this.baseurl + 'profile/', options);
    }

    save_profiledata(credetentials): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token });
        const options = { headers };
        return this.http.patch(this.baseurl + 'profile/', credetentials, options);
    }







    // STEP COMMENTS

    add_step_comment(credetentials, stepId): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token });
        const options = { headers };
        return this.http.post(this.baseurl + 'steps/' + stepId + '/stepcomments/', credetentials, options);
    }



    // STEP COMMENT

    delete_step_comment(stepId, commentId): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token });
        const options = { headers };
        return this.http.delete(this.baseurl + 'steps/' + stepId + '/stepcomments/' + commentId + '/', options);
    }











    // PROJECT LIKES


    add_projectlike(projectId): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token });
        const options = { headers };
        return this.http.post(this.baseurl + 'projects/' + projectId + '/projectlikes/', null, options);
    }

    remove_projectlike(projectId, likeId): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token  });
        const options = { headers };
        return this.http.delete(this.baseurl + 'projects/' + projectId + '/projectlikes/' + likeId + '/', options);
    }




    // STEP LIKES


    add_steplike(stepId): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token });
        const options = { headers };
        return this.http.post(this.baseurl + 'steps/' + stepId + '/steplikes/' , null, options);
    }


    remove_steplike(stepId, likeId): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token });
        const options = { headers };
        return this.http.delete(this.baseurl + 'steps/' + stepId + '/steplikes/' + likeId + '/', options);
    }





    // PROJECTS

    get_all_projects(params): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token});
        const options = { headers, params };
        return this.http.get(this.baseurl + 'projects/', options);
    }


    start_new_project(credetentials): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token });
        const options = { headers };
        return this.http.post(this.baseurl + 'projects/', credetentials, options);
    }






    // PROJECT


    get_project_data(params, urlToken): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token  });
        const options = { headers, params };
        return this.http.get(this.baseurl + 'projects/' + urlToken + '/', options);
    }

    delete_project(urlToken): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token });
        const options = { headers };
        return this.http.delete(this.baseurl + 'projects/' + urlToken + '/', options);
    }

    edit_project(credetentials, projectId): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token });
        const options = { headers };
        return this.http.patch(this.baseurl + 'projects/' + projectId + '/', credetentials, options);
    }






    // DELETE ACCOUNT

    delete_account(credetentials): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token });
        const options = { headers };
        return this.http.post(this.baseurl + 'delete-account/', credetentials, options);
    }




    // STEPS

    add_step(credetentials): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token });
        const options = { headers };
        return this.http.post(this.baseurl + 'steps/', credetentials, options);
    }







    // STEP

    edit_step(credetentials, stepId): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token });
        const options = { headers };
        return this.http.patch(this.baseurl + 'steps/' + stepId + '/', credetentials, options);
    }

    delete_step(stepId): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token });
        const options = { headers };
        return this.http.delete(this.baseurl + 'steps/' + stepId + '/', options);
    }







    // CHALLENGES

    get_challenges(): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token});
        const options = { headers };
        return this.http.get(this.baseurl + 'challenges/', options);
    }





    // USER

    get_user_data(urlToken): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers };
        return this.http.get(this.baseurl + 'users/' + urlToken + '/', options);
    }





    // MESSAGES

    sendMessage(messageData): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers };
        return this.http.post(this.baseurl + 'send-message/', messageData, options);
    }





    // NOTIFICATIONS

    delete_notifications(): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token });
        const options = { headers };
        return this.http.delete(this.baseurl + 'notifications/', options);
    }

    mark_notifications_as_read(): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.auth_token });
        const options = { headers };
        return this.http.patch(this.baseurl + 'notifications/', null, options);
    }

}
