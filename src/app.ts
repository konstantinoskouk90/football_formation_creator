import { Router, RouterConfiguration } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { WebAPI } from './web-api/web-api';

@inject(WebAPI)
export class App {

    constructor(public api: WebAPI) {
        
    }
}