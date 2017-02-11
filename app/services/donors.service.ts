import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Donor } from "../models/donor";
import { RootService } from "./root.service";

import Geometry = require("esri/geometry/support/webMercatorUtils");

@Injectable()
export class DonorsService {
  private _headers: Headers;
  
  constructor(private http: Http, private rootService: RootService) {       
      this._headers = new Headers({
          'content-type': 'application/json'
      });      
   }

  getDonors(arr1, arr2) {
    return this.http
      .post("api/items", { minLL: arr1, maxLL: arr2 }, {headers : this._headers})
      .map((res:Response) => res.json())
  }

  saveUser(donor: Donor){
    donor.ipaddress = this.rootService.getIp();
    return this.http
      .post("api/item", donor, {headers : this._headers})
      .map((res:Response) => res.json())
  }

  deleteUser(id: string){
    return this.http
      .delete("api/item/"+id, {headers : this._headers})
      .map((res:Response) => res.json())
  }

  updateUser(id: string, donor: Donor){
    donor.ipaddress = this.rootService.getIp();
    return this.http
      .post("api/item/"+id, donor, {headers : this._headers})
      .map((res:Response) => res.json())
  }

  getDonor(id){
    return this.http
      .get("api/items/"+id, {headers : this._headers})
      .map((res:Response) => res.json())
  }
  
  getDonorOnLocation(evt, module){
    var mapPoint = evt.mapPoint;
    for(var i in module.graphics.items){
        mapPoint.longitude = module.graphics.items[i].attributes.geolocation.longitude;
        mapPoint.latitude = module.graphics.items[i].attributes.geolocation.latitude;
        var screenCords = module.toScreen(mapPoint);
        var diffX = Math.abs(screenCords.x-evt.x);
        var diffY = screenCords.y-evt.y;
        if(diffX < 20 && diffY < 41){
            return module.graphics.items[i].attributes;
        }
    }
    return;
  }
}