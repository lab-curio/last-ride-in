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

exports.stop = function(req, res){
	var agency_id = req.params.agency_id
      , route_id = req.params.route_id
      , stop_id = req.params.stop_id
      , north_stop_id
      , south_stop_id;	
      
	// stops are split into northbound and southbound stops.
	// ex: G22S and G22N	  
	
    if (stop_id.substr(-1) === "N") {
		north_stop_id = stop_id;
		south_stop_id = stop_id.substring(0,stop_id.length-1) + "S";
	} else {
		north_stop_id = stop_id.substring(0,stop_id.length-1) + "N";
		south_stop_id = stop_id;
	}	 
	 
	gtfs.getTimesByStop(agency_id, route_id, north_stop_id, 0, function(e, northData) {
		gtfs.getTimesByStop(agency_id, route_id, south_stop_id, 1, function(e, southData) {
			gtfs.findBothDirectionNames(agency_id, route_id, function(directionsObj) {
				// console.log(northData + southData);
				console.log(JSON.stringify(directionsObj));
				
		 		res.render('stop', {
		 			title : req.params.route_id + ' - ' + req.params.stop_id,
		 			locals : {
		 				times : northData,
						'route_id' : route_id
		 			}
		 		})
		 	});
		});
	});


};

exports.map = function(req, res) {
	res.render('map', { layout: 'map' });
};