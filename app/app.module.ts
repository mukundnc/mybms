import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { RouterModule }   from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home.component';
import { MapComponent } from './components/map.component';
import { ModalComponentWindow } from './components/modal.component';
import { CoordinateComponent } from './components/coordinate.component';
import { DonorsComponent } from './components/donors.component';
import { DonorComponent } from './components/donor.component';

import { MapService } from './services/map.service';
import { DonorsService } from './services/donors.service';
import { RootService } from './services/root.service';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'donor/:id', component: DonorComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full'}
      ], { useHash: true })
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    CoordinateComponent,
    DonorsComponent,
    DonorComponent,
    ModalComponentWindow
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    MapService,
    DonorsService,
    RootService
  ],
  entryComponents: [ ModalComponentWindow ]
})
export class AppModule {
  constructor() {

  }
}
