import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import MapView = require('esri/views/MapView');
import Point = require('esri/geometry/Point');
import SpatialReference = require('esri/geometry/SpatialReference');
import PopupTemplate = require("esri/PopupTemplate");
import Geometry = require("esri/geometry/support/webMercatorUtils");
import Search = require('esri/widgets/Search');

import { MapService } from '../services/map.service';
import { RootService } from '../services/root.service';
import { DonorsService } from '../services/donors.service';
import { Donor } from "../models/donor";
import { GeoLocation } from "../models/geolocation";
import { ModalComponentWindowData } from "../models/modalwindowdata";
import { ModalComponentWindow } from './modal.component';

@Component({
  selector: 'esri-map',
  template: require('../templates/map.component.html'),
  providers: [ Modal ]
})

export class MapComponent implements OnInit, OnDestroy {

  mapView: MapView;

  constructor(private mapService: MapService, private donorsService: DonorsService, private router: Router,
    public modal: Modal, private rootService: RootService) { }

  ngOnInit(){
      this.rootService.getUserLocation(this.OnSuccess.bind(this));
      this.mapView = new MapView({
        container: "mapcontainer",//this.elementRef.nativeElement.firstChild,
        map: this.mapService.getBaseMap(),
        center: new Point({
            x:  34.05,
            y:  -117.19,
            spatialReference: new SpatialReference({ wkid: 4326 })
          }),
          zoom: 14
      });        
      this.bindEvents();    
      this.addSearchWidget();
  }

  ngOnDestroy(){

  }

  addSearchWidget(){
    var searchWidget = new Search({
        view: this.mapView
      });
      searchWidget.set("container", "search");
      this.mapView.ui.add(searchWidget, {
          position: "top-right",
          index: 1
      });
  }

  bindEvents(){
    this.mapView.on("click", function(event) {     
        if(event.native.which === 3 || event.native.button === 2)   
            return;
        var mapPoint = this.mapView.toMap({x:event.x, y:event.y});      
        var donor = this.donorsService.getDonorOnLocation(event, this.mapView);
        if(!donor){
            donor = new Donor();
            donor.geolocation = new GeoLocation();
            donor.geolocation.latitude = mapPoint.latitude;
            donor.geolocation.longitude = mapPoint.longitude;
        };        
        this.modal.open(ModalComponentWindow, overlayConfigFactory({ donor: donor }, BSModalContext))
          .then(function(result){
            result.onDestroy.subscribe(success => this.OnSuccess(donor.geolocation))
          }.bind(this));
      }.bind(this));
  }

  OnSuccess(location) {
      var pt = new Point({
        latitude: location.latitude,
        longitude: location.longitude
      });
      // navigate map to the given point
      this.mapView.goTo(pt);
  }

  onViewCreated() {
      console.log("map view created");
  }

}
