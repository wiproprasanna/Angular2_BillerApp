"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BillerComponent = (function () {
    function BillerComponent() {
        this.userArry = [];
        this.userBiller = {};
        this.userbillArry = [];
        this.billerArry = [];
        this.varShow = false;
        this.varShow1 = false;
        this.varShow2 = false;
        this.varShow3 = false;
        this.geBill = {};
        this.flag = true;
    }
    BillerComponent.prototype.getUsers = function () {
        console.log("button clicked");
        this.varShow = true;
        this.varShow1 = false;
        var storedData = JSON.parse(localStorage.getItem("Users"));
        if (storedData) {
            this.userArry = storedData;
        }
        else {
            document.getElementById("empty").innerHTML = "<h1>No User Found--Contact Admin</h1>";
        }
    };
    BillerComponent.prototype.getBillers = function (user) {
        this.varShow3 = false;
        this.varShow1 = false;
        this.varShow2 = user;
        var storedData = JSON.parse(localStorage.getItem("Billers"));
        if (storedData) {
            this.billerArry = storedData;
        }
        else {
            document.getElementById("empty").innerHTML = "<h1>No Biller Found--Contact Admin</h1>";
        }
    };
    BillerComponent.prototype.shgen = function (user, bill) {
        this.varShow3 = bill;
        console.log("generate Bill", user, bill);
    };
    BillerComponent.prototype.add = function (user, biller) {
        console.log(user, biller);
        var storedData = JSON.parse(localStorage.getItem("userBiller"));
        if (storedData && storedData[user]) {
            if (storedData[user].indexOf(biller) < 0) {
                this.userBiller = storedData;
                console.log(this.userBiller[user]);
                this.userBiller[user].push(biller);
                console.log(this.userBiller);
                localStorage.setItem("userBiller", JSON.stringify(this.userBiller));
                console.log("localstorage", JSON.parse(localStorage.getItem("userBiller")));
                this.userbillArry = [];
                this.userBiller = {};
            }
            else {
                alert(user + " you have already Subscribed to " + biller);
            }
        }
        else {
            if (storedData) {
                console.log("ARRAY PRESENT KEY NOT PRESENT");
                this.userBiller = storedData;
            }
            this.userbillArry.push(biller);
            var obj = (_a = {}, _a[user] = this.userbillArry, _a);
            this.userBiller = Object.assign({}, this.userBiller, obj);
            localStorage.setItem("userBiller", JSON.stringify(this.userBiller));
            console.log("localstorage", JSON.parse(localStorage.getItem("userBiller")));
            this.userbillArry = [];
            this.userBiller = {};
        }
        var _a;
    };
    BillerComponent.prototype.viewBill = function (user, bill) {
        console.log("view Bill", user, bill);
        this.varShow1 = user;
        this.varShow2 = false;
        this.varShow3 = false;
        var storedData = JSON.parse(localStorage.getItem("userBiller"));
        if (storedData) {
            this.billerArry = storedData[user];
            console.log(storedData, this.billerArry);
        }
        else {
            document.getElementById("empty").innerHTML = "<h2>No Pending Bill</h2>";
        }
    };
    BillerComponent.prototype.genBill = function (user, bill, mon, amt) {
        this.varShow3 = false;
        var storedData = JSON.parse(localStorage.getItem(user));
        if (storedData) {
            if (typeof (storedData[bill]) == "undefined") {
                this.userBiller = storedData;
                this.flag = true;
            }
        }
        if (this.flag || !storedData) {
            this.userbillArry.push(mon);
            this.userbillArry.push(amt);
            this.userbillArry.push(false);
            var obj = (_a = {}, _a[bill] = this.userbillArry, _a);
            this.userBiller = Object.assign({}, this.userBiller, obj);
            localStorage.setItem(user, JSON.stringify(this.userBiller));
            console.log("localstorage", JSON.parse(localStorage.getItem(user)));
            this.userbillArry = [];
            this.userBiller = {};
            this.flag = false;
        }
        var _a;
        //document.getElementById(bill).innerHTML="PAY BiLL";
    };
    return BillerComponent;
}());
BillerComponent = __decorate([
    core_1.Component({
        template: "<h2>Biller COMPONENT</h2>\n\t<button (click)=\"getUsers()\">Get Users</button>\n\t\n\t<div *ngIf=\"varShow\">\n\t<ul>\n\t<li  *ngFor=\"let users of userArry\">{{users}}\n       <div >\n\t      <button (click)=\"getBillers(users)\">Add Biller</button>\n\t       <button (click)=\"viewBill(users)\">Generate Bill</button>\n\t        <button (click)=\"payBill(users)\">Pay Bill</button>\n\t       \n\t        <div *ngIf=\"(users==varShow2)\">\n\t          <ul >\n\t          <li *ngFor=\"let bill of billerArry\">{{bill}}\n                <button (click)=\"add(users,bill)\">ADD</button>\n\t          </li>\n\t          </ul>\n\t        </div>\n\t      \n\t      <div *ngIf=\"(users==varShow1)\">\n\t          <ul >\n\t          <li *ngFor=\"let bill of billerArry\">{{bill}}\n                <button (click)=\"shgen(users,bill)\">Generate Bill</button>\n                <div id=\"genDiv\" *ngIf=\"(bill==varShow3)\">\n                <input #billMonth placeHolder=\"ENTER BILL MONTH\" />\n                <Input #billAmount placeHolder=\"ENTER BILL Amount\" />\n                <button (click)=\"genBill(users,bill,billMonth.value,billAmount.value)\">Generate</button>\n\t            </div>          \n\t          </li>\n\t          </ul>\n\t        </div>\n\t     \n\t   </div>\n\t<br><hr><br></li>\n    \n\t</ul>\n\t</div>\n\n\t\n\t<p id=\"empty\"></p>"
    })
], BillerComponent);
exports.BillerComponent = BillerComponent;
//# sourceMappingURL=biller.component.js.map