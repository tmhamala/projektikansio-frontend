var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
 * Slim v4.1.1 - Image Cropping Made Easy
 * Copyright (c) 2016 Rik Schennink - http://slimimagecropper.com
 */
var SlimLib = require('./slim.commonjs');
// Angular core
import { ViewChild, Component, Input, ElementRef } from "@angular/core";
var Slim = (function () {
    function Slim() {
    }
    Slim.prototype.ngOnInit = function () {
        SlimLib.create(this.element.nativeElement, this.options);
    };
    __decorate([
        ViewChild('root'),
        __metadata("design:type", ElementRef)
    ], Slim.prototype, "element", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Slim.prototype, "options", void 0);
    Slim = __decorate([
        Component({
            selector: 'slim',
            template: '<div #root><ng-content></ng-content></div>'
        })
    ], Slim);
    return Slim;
}());
export { Slim };
;
//# sourceMappingURL=slim.angular2.js.map