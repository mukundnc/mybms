import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Donor } from "../models/donor";
import { DonorsService } from '../services/donors.service';
import { RootService } from '../services/root.service';

import * as io from 'socket.io-client';

@Component({
  selector: 'donor',
  template: require('../templates/donor.component.html')
})

export class DonorComponent implements OnInit {

    donor : Donor;
    id : string;
    socket;
        

    constructor(private donorsService: DonorsService, private router: Router, private route:ActivatedRoute, private rootService: RootService) {
        this.donor = new Donor();
        this.socket = this.rootService.getSocketIO();
    }

    socketReceiveHandler(resp){
        console.log('received donor with data, ', resp);
        if(this.donor._id = resp.data.donor._id)
            this.donor = resp.data.donor;
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.donorsService.getDonor(this.id)
            .subscribe(success => this.setDonorView(success));
        this.socket.on('donorReceive', this.socketReceiveHandler.bind(this));
    }

    setDonorView(resp){
        this.donor = resp.result[0];
    }

    onSubmit() {
        this.donorsService.updateUser(this.id, this.donor)
            .subscribe(success => this.onSaveSuccess(success));
    }

    onDelete() {
        this.donorsService.deleteUser(this.id)
            .subscribe(success => this.onDeleteSuccess(success));
    }

    onSaveSuccess(res){
        console.log(res);
        this.socket.emit('donorEmit', { data: { action: "edit", donor: this.donor} });
        this.finally();
    }

    onDeleteSuccess(res){
        console.log(res);
        this.socket.emit('donorEmit', { data: { action: "delete", donor: this.donor} });
        this.finally();
    }

    finally(){
        this.router.navigateByUrl('/home');
    }

}