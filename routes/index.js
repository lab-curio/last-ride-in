
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
	res.render('route', {
		title : req.params.route_id + ' - last ride in',
		locals : {
			stops : ['stop1', 'stop2', 'stop3']
		}
	})
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