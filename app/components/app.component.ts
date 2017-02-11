import { Component, OnInit } from '@angular/core';
import { RootService } from '../services/root.service';

@Component({
  selector: 'my-app',
  template: require('../templates/app.component.html')
})
export class AppComponent implements OnInit {
  constructor(private rootService: RootService) {

  }

  ngOnInit() {
      this.rootService.getIpAddress()
        .subscribe(success => this.onSuccess(success));
  }

  onSuccess(resp){
      console.log("set ip address globally");
  }

}
