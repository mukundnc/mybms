'use strict';

var wrap = require('co-monk');
let collection = 'items';

class Item{
	constructor(){
        
	}

    * getItem (db, id) {

        var items = wrap(db.get(collection));
        let result = yield items.find({'_id': id});
        return result;

    }

    * getItems (db, area) {

        var items = wrap(db.get(collection));        
        let result = yield items.find({ "geolocation" : { "$geoWithin" : { "$polygon" : area } } });
        return result;

    }

    * updateItem (db, id, doc) {

        var options = { upsert: true, multi: false };
        var items = wrap(db.get(collection));
        let result = yield items.update({ '_id': id }, doc, options);
	    return result;

    }	

    * saveItem(db, doc){

        var items = wrap(db.get(collection));
        let result = yield items.insert(doc);
	    return result;

    }

    * deleteItem(db, id){

        var items = wrap(db.get(collection));
        let result = yield items.remove({'_id': id});
	    return result;

    }
    
};

module.exports = new Item();