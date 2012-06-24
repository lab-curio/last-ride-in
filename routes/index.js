var gtfs = require('../');

/*
 * GET the index page.
 */

exports.index = function(req, res){
	res.render('index', {
		title : "last ride in"
	});
};

exports.route = function(req, res){
	/*
	 * Uncomment that stuff once the data fetching is implemented
	 */
	
	// dataGetter.getData(req.params, function(error, data) {
	// 	res.render('route', {
	// 		title : req.params.route_id + ' - last ride in',
	// 		locals : {
	// 			stops : data
	// 		}
	// 	})
	// });
	
	var agency_id = req.params.agency_id
      , route_id = req.params.route_id;
      
    //currently getStopsByRoute does not get both directions - for now, direction_id hardcoded to 1 until fixed  
	gtfs.getStopsByRoute(agency_id, route_id, 1, function(e, data){		
		//data is an array of json objects
		console.log(data);
		res.render('route', {
			title : req.params.route_id + ' - last ride in',
			locals : {
				stops : data,
				'route_id' : route_id,
				'agency_id' : agency_id
			}
		})

	});
};

// exports.stop = function(req, res){
// 	dataGetter.getData(req.params, function(error, data) {
// 		res.render('stop', {
// 			title : req.params.route_id + ' - ' + req.params.stop_id,
// 			locals : {
// 				times : data
// 			}
// 		})
// 	});
// };
