'use strict';

var item = require('../models/item');
var ObjectID = require('mongodb').ObjectID;

class ItemService{
	constructor(){

	}

	* getItem(db, params){
		let data = yield item.getItem(db, params.id);
		return data;
	}

	* getItems(db, params){		
        var polygon = [];
        polygon.push([params.data.minLL[1], params.data.minLL[0]]);
        polygon.push([params.data.minLL[1], params.data.maxLL[0]]);
        polygon.push([params.data.maxLL[1], params.data.maxLL[0]]);
        polygon.push([params.data.maxLL[1], params.data.minLL[0]]);
		let data = yield item.getItems(db, polygon);
		return data;
	}

	* saveItem(db, params){
		//run validation here
		params.data._id = new ObjectID();
		let data = yield item.saveItem(db, params.data);
		return data;
	}

	* updateItem(db, params){
		//run validation here
		let data = yield item.updateItem(db, params.id, params.data);
		return data;
	}

	* deleteItem(db, params){
		//run validation here
		let data = yield item.deleteItem(db, params.id);
		return data;
	}
}

module.exports = new ItemService();