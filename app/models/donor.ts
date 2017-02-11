import {GeoLocation} from './geolocation';

export class Donor {
    public _id: string;
    public id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phone: string;
    public bloodgroup: string;
    public geolocation: GeoLocation;
    public editKey: string;
    public ipaddress: string;
    
    constructor() { }
}