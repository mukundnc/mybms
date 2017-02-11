var should = require('should');
var request = require('request');
var url = "https://localhost:3001/api/";

describe('Test suite on donor crud operations', function () {
    
    var id;

    before(function (done) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        done();
    });
    
    it('1. Add donor information', function (done) {
        var donor = {
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
        var options = {
            url: url+'item',
            headers: {
                'content-type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(donor)
        }
        request(options, function(err, response, body) {
            
            should.not.exists(err, 'error should not exist');
            var data = JSON.parse(body);
            should.exist(data, "should have response object");
            should.exist(data.result, 'result does not exist');
            should.exist(data.result._id, 'required to get _id');           
            id = data.result._id;
            done();

        });        
    });
    
    it('2. Update Donor information', function (done) {
        var donor = {
            "_id": id,
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
        var options = {
            url: url+'item/'+id,
            headers: {
                'content-type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(donor)
        }
        request(options, function(err, response, body) {
            
            should.not.exists(err, 'error should not exist');
            var data = JSON.parse(body);
            should.exist(data, "should have response object");
            should.exist(data.result, 'result does not exist');
            should.exist(data.result.ok, 'required to get ok');            
            should.equal(data.result.ok, 1, 'ok should be 1');    
            should.exist(data.result.nModified, 'required to get nModified');            
            should.equal(data.result.nModified, 1, 'nModified should be 1');  
            should.exist(data.result.n, 'required to get n');            
            should.equal(data.result.n, 1, 'n should be 1');     
            done();

        });        
    });

    it('3. Get Donor information', function (done) {
        var area = { minLL: [173.79, 108.54], maxLL: [173.795, 108.55] }
        var options = {
            url: url+'items',
            headers: {
                'content-type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(area)
        }
        request(options, function(err, response, body) {
            
            should.not.exists(err, 'error should not exist');
            var data = JSON.parse(body);
            should.exist(data, "should have response object");
            should.exist(data.result, 'result does not exist');
            should.exist(data.result.length, 'required to get ok');            
            should.equal(data.result.length, 1, 'ok should be 1');    
            should.exist(data.result[0]._id, 'required to get nModified');            
            should.equal(data.result[0]._id, id, 'nModified should be 1');  
            should.exist(data.result[0].firstName, 'required to get n');            
            should.equal(data.result[0].firstName, "test", 'n should be 1');     
            done();

        });        
    });
    
    it('4. Delete Donor information', function (done) {
        
        var options = {
            url: url+'item/'+id,
            headers: {
                'content-type': 'application/json'
            },
            method: "DELETE"
        }
        request(options, function(err, response, body) {
            
            should.not.exists(err, 'error should not exist');
            var data = JSON.parse(body);
            should.exist(data, "should have response object");
            should.exist(data.result, 'result does not exist');
            should.exist(data.result.ok, 'required to get ok');            
            should.equal(data.result.ok, 1, 'ok should be 1');    
            should.exist(data.result.n, 'required to get n');            
            should.equal(data.result.n, 1, 'n should be 1');       
            done();

        });        
    });

    after(function (done) {
        id=null;
        done();
    });

});


