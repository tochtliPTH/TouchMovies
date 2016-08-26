var express = require('express');
var router = express.Router();
var MovieHelper=require('../modules/MoviesHelper');
/* GET home page. */
router.get('/', function(req, res, next) {
	var recomend=new Array();
	var movieAux;
	MovieHelper.getRandomSearch('movie').done(function(data){				
		if(data.Response=="True"){						
			recomend.push(data.Search[0]);
			movieAux=data.Search[1];			
		}
		MovieHelper.getRandomSearch('series').done(function(data){
			if(data.Response=="True")
				recomend.push(data.Search[0]);
			MovieHelper.getRandomSearch('episode').done(function(data){				
				if(data.Response=="True")
					recomend.push(data.Search[0]);
				else
					recomend.push(movieAux);
				res.render('index', { 'title': 'TouchMovies', 'recomend':recomend});
			});
		});
	})  	
});

router.post('/', function(req, res, next) {	
	MovieHelper.search({query:req.body.title,page:1}).done(function(resp){
		res.render('search',{result:resp.Search});
	});

	/*MovieHelper.getDetail(req.params.id).done(function(data){				
		console.log(data);
		res.render('detail', { 'title': data.Title,'info':data});			
	});*/	
});

router.get('/:id', function(req, res, next) {

	MovieHelper.getDetail(req.params.id).done(function(data){				
		console.log(data);
		res.render('detail', { 'title': data.Title,'info':data});			
	});	
});

/*router.post('/:title',function(req,res){
	console.log(req.params.title)
	res.render('search', { 'title': 'busqueda','info':'x'});	
});*/

module.exports = router;
