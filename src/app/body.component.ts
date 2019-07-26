import { Component } from '@angular/core';


@Component({
    selector: 'ng-component',
    template: `

  <div class="page-body no-padding">
    <div class="background-image"></div>


    <app-navigationbar-component></app-navigationbar-component>
    <app-notifications-component></app-notifications-component>

    <div class="row" style="margin: 0">
        <router-outlet></router-outlet>
    </div>


  </div>




 `,




})
export class BodyComponent {

}

