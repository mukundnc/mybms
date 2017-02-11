'use strict';

var itemService = require('../services/itemservice');

class ItemController{
	constructor(){

	}

	* getItem (db, params){
		return yield itemService.getItem(db, params);	
	}

	* getItems (db, params){
		return yield itemService.getItems(db, params);	
	}

	* saveItem (db, params){
		return yield itemService.saveItem(db, params);	
	}

	* updateItem (db, params){
		return yield itemService.updateItem(db, params);	
	}

	* deleteItem (db, params){
		return yield itemService.deleteItem(db, params);	
	}
}

module.exports = new ItemController();