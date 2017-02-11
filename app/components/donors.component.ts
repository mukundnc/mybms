import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import MapView = require('esri/views/MapView');
import Point = require('esri/geometry/Point');
import TextSymbol = require('esri/symbols/TextSymbol');
import Font = require('esri/symbols/Font');
import Graphic = require('esri/Graphic');
import watchUtils = require("esri/core/watchUtils");
import Geometry = require("esri/geometry/support/webMercatorUtils");
import { DonorsService } from '../services/donors.service';
import { Extent } from '../models/extent';
import { RootService } from '../services/root.service';


@Component({
  selector: 'donors',
  template: ''
})

export class DonorsComponent implements OnInit, OnDestroy {
  @Input('map-view')
  mapView: MapView;
  extent: Extent;
  watchHanldles: Array<any> = [];
  socket;

  constructor(private donorsService: DonorsService, private rootService: RootService) {
      this.socket = this.rootService.getSocketIO();
  }

  ngOnInit() {
    var handle1 = watchUtils.when(this.mapView, "stationary", function(res){
      if(this.extent && res === true){
        var arr1 = Geometry.xyToLngLat(this.extent.xmin, this.extent.ymin);
        var arr2 = Geometry.xyToLngLat(this.extent.xmax, this.extent.ymax);
        console.log(arr1, arr2);
        this.donorsService.getDonors(arr1, arr2)
          .subscribe(res => this.addDonorsOnMap(res));
      }
    }.bind(this));

    var handle2 = watchUtils.when(this.mapView, "extent", function(result){
        this.extent = new Extent(result.xmin, result.ymin, result.xmax, result.ymax)
    }.bind(this));

    this.watchHanldles.push(handle1);
    this.watchHanldles.push(handle2);

    this.socket.on('donorReceive', this.handleDonorChange.bind(this));
  }

  ngOnDestroy(){
    for(var i in this.watchHanldles){
      this.watchHanldles[i].remove();
    }
    this.mapView.graphics.removeAll();
  }

  handleDonorChange(resp){ 
      var data = resp.data;
      console.log(data);
      var index = -1;
      for(var i = 0; i < this.mapView.graphics.length; i++){
          if(data.donor._id === this.mapView.graphics.getItemAt(i).attributes._id){
            index = i;
            break;
          }
      };
      if(index >-1){
          if(data.action === "edit")
              this.mapView.graphics.getItemAt(index).attributes = data.donor;
          else if(data.action === "delete")
              this.mapView.graphics.removeAt(index);
      }
  }

  addDonorsOnMap(res){
      console.log("points on graph:", res);

      // Remove all graphics on the map
      this.mapView.graphics.removeAll();
      
      var donorPoints = new Array;
      for(var i in res.result){
        // create a point geometry
        var point = new Point({
          longitude: parseFloat(res.result[i].geolocation.longitude),
          latitude: parseFloat(res.result[i].geolocation.latitude)
        });

        // Create a symbol for drawing the point
        var textSymbol = new TextSymbol();
        textSymbol.set("color","#7A003C");
        textSymbol.set("text","\ue61d");
        var font = new Font({
          size:30,
          family:"CalciteWebCoreIcons"        
        })
        textSymbol.set("font", font);
        
        // Create a graphic and add geometry and symbol to it
        var pointGraphic = new Graphic({
          geometry: point,
          symbol: textSymbol,
          attributes: res.result[i]
        });
        donorPoints.push(pointGraphic);
      }
      if(donorPoints.length > 0){
        // Draw all graphics on to the map view
        this.mapView.graphics.addMany(donorPoints);
      }
  }

}