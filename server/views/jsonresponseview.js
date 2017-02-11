'use strict';

class JsonRPCview {

	onSuccess(res, result, requestId) {		
		
		res.response.status = 200;
		res.type = 'json';
		res.body = {
			result: result,
			id: requestId
		};
	};

	onError(res, err, requestId) {
		
		res.response.status = 500;
		res.type = 'json';
		res.body = {
			error: err,
			id: requestId
		};
	};

	onAuthenticationFailure(res, err, requestId) {

	    res.response.status = 403;
	    res.type = 'json';
	    res.body = {
	        error: err,
	        id: requestId
	    };
	};

}

module.exports = new JsonRPCview();;
	
