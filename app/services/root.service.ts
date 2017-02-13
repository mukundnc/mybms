import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { GeoLocation } from '../models/geolocation';

import * as io from 'socket.io-client';

@Injectable()
export class RootService {
  private _ipaddress: string;
  private socket = io(window.location.origin);
  
  constructor(private http: Http) {       
        // this.socket = io('https://localhost:3001');
   }

   getIpAddress(){
       return this.http
            .get("//jsonip.com/")
            .map((res:Response) => this.setIp(res.json()));
   }

   getUserLocation(callback){
       if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                var location = new GeoLocation();
                location.latitude = position.coords.latitude;
                location.longitude = position.coords.longitude;
                callback(location);
            });
        } else {
            var location = new GeoLocation();
            location.latitude = 34.05;
            location.longitude = -117.19;
            callback(location);
        }    
   }

   setIp(resp){
       this._ipaddress = resp.ip;
   }

   getIp(){
       return this._ipaddress;
   }

   getSocketIO(){
        return this.socket;        
   }
}