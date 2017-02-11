var monk = require('monk');
var co = require('co');
var should = require('should');
var itemService = require('../../server/services/itemservice');
var config = require('../../config/config')
    
describe('Test suite on requisition document', function () {
    
    var id, db;
        
    before(function (done) {     
        db = monk(config.dbConnectionString);   
        done();
    });
    
    it('1. Add donor to database', function (done) {
        var data = co.wrap(co.wrap(co.wrap(itemService.saveItem)));
        var params = {
            data:  {
                "geolocation" : {
                    "latitude" : 108.544423722569785, 
                    "longitude" : 173.79233689206544
                }, 
                "firstName" : "mukundan", 
                "lastName" : "nc", 
                "email" : "mukund.nc@gmail.com", 
                "phone" : "00919049002215", 
                "bloodgroup" : "O-ve", 
                "ipaddress" : "223.229.249.53"
            }
        };
        data(db, params).then(function (val) {
            should.exist(val, "value does not exist");
            should.exist(val._id);
            id = val._id;
            done();            
        });
    });

    it('2. Update donor from database', function (done) {
        var data = co.wrap(co.wrap(co.wrap(itemService.updateItem)));
        var params = {
            id: id,
            data:  {
                "geolocation" : {
                    "latitude" : 108.544423722569785, 
                    "longitude" : 173.79233689206544
                }, 
                "firstName" : "test", 
                "lastName" : "nc", 
                "email" : "mukund.nc@gmail.com", 
                "phone" : "00919049002215", 
                "bloodgroup" : "O-ve", 
                "ipaddress" : "223.229.249.53"
            }
        };
        data(db, params).then(function (val) {
            should.exist(val, "value does not exist");
            should.exist(val.ok, 'required to get ok');            
            should.equal(val.ok, 1, 'ok should be 1');    
            should.exist(val.nModified, 'required to get nModified');            
            should.equal(val.nModified, 1, 'nModified should be 1');  
            should.exist(val.n, 'required to get n');            
            should.equal(val.n, 1, 'n should be 1');     
            done();            
        });
    });
    
    it('3. Get donors from database', function (done) {
        var data = co.wrap(co.wrap(co.wrap(itemService.getItems)));
        var params = {
            data:  { 
                minLL: [173.79, 108.54], 
                maxLL: [173.795, 108.55] 
            }
        };
        data(db, params).then(function (val) {
            should.exist(val, "value does not exist");            
            should.exist(val.length, 'required to get ok');            
            should.equal(val.length, 1, 'ok should be 1');    
            should.exist(val[0]._id, 'required to get nModified');            
            should.exist(val[0].firstName, 'required to get n');            
            should.equal(val[0].firstName, "test", 'n should be 1');
            done();            
        });
    });

    it('4. Delete donor from database', function (done) {
        var data = co.wrap(co.wrap(co.wrap(itemService.deleteItem)));
        var params = {
            id: id
        };
        data(db, params).then(function (val) {
            
            should.exist(val, "value does not exist");            
            should.exist(val.result, "value does not exist");            
            should.exist(val.result.ok, 'required to get ok');            
            should.equal(val.result.ok, 1, 'ok should be 1');    
            should.exist(val.result.n, 'required to get n');            
            should.equal(val.result.n, 1, 'n should be 1');        
            done();            
        });
    });

  
    after(function (done) {
        db = null;
        done();
    });

});