var elasticsearch = require('elasticsearch');
var express = require('express');
var router = express.Router();
var config = require('../config').config();

var client = new elasticsearch.Client({
  host: config.elasticsearch_host,
  log: 'trace'
});

router.get('/search', function(req, res) {

	client.search({
	  q: req.query.query
	}).then(function (body) {
	  var hits = body.hits.hits;
	  processOutput(hits,function(csv){
	  		res.setHeader('Content-disposition', 'attachment; filename='+config.search_filename+'.csv');
	  		res.set('Content-Type', 'text/csv');
	  		res.status(200).send(csv);
	  });
	}, function (error) {
	  res.send(error.message);
	}); 
});

var processOutput = function(hits,callback){
	var text="timestamp,text\n";
	for(var i=0;i<hits.length;i++){
		text+=hits[i]._source.time+",\""+hits[i]._source.text.replace('\n','')+"\"\n";
	}
	callback(text);
};

module.exports = router;