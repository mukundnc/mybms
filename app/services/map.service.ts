import { Injectable } from '@angular/core';

import Map = require('esri/Map');

@Injectable()
export class MapService {
  map: Map;
  constructor() { }

  getBaseMap(){
    this.map = new Map({
      basemap: 'gray'
    });

    return this.map;
  }
  
}
