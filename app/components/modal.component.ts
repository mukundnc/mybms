import { Component } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';

import { ModalComponentWindowData } from "../models/modalwindowdata";
import { DonorsService } from '../services/donors.service';

@Component({
  selector: 'modal-content',
  template: require('../templates/modal.component.html')
})

export class ModalComponentWindow implements CloseGuard, ModalComponent<ModalComponentWindowData> {
  context: ModalComponentWindowData;
  email: string;
  phone: string;
  title: string;
  showAlert: Boolean;
  isAdd: boolean;
  link: string;
  hideAdd: boolean = false;

  constructor(public dialog: DialogRef<ModalComponentWindowData>, private donorsService: DonorsService) {
    this.email = "Click to View";
    this.phone = "Click to View";
    this.context = dialog.context;
    if(this.context.donor.phone){
      this.title = "See";
      this.isAdd = false;
    } else {
      this.title = "Add";  
      this.isAdd = true;
    }
    this.showAlert = false;
  }

  onSubmit() {
    this.donorsService.saveUser(this.context.donor)
      .subscribe(success => this.onSuccess(success))
  }

  onSuccess(res){
      this.showAlert = true;
      this.link = window.location.origin + "/#/donor/" + res.result._id;
      this.hideAdd = true;
  }

  
}
