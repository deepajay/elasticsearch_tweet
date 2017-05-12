var elasticsearch = require('elasticsearch');
var twitter =require('twitter');
var config = require('../config').config();

var client = new elasticsearch.Client({
  host: config.elasticsearch_host,
  log: 'trace'
});

var twitterclient = new twitter({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token_key: config.access_token_key,
	access_token_secret: config.access_token_secret
});

var tweets=0;
var numberOfTweets = config.NUMBER_OF_TWEETS;
var keyword= config.KEYWORD;

twitterclient.stream('statuses/filter', {track: keyword},  function(stream) {

	stream.on('data', function(tweet) {
	    tweets++;
	    var doc={
	    	time:tweet.created_at,
	    	text:tweet.text
	    };
	    indexDocument(tweets,doc);
	    if(tweets > numberOfTweets){
	    	stream.destroy();
	    }
	});
	stream.on('error', function(error) {
	    console.log(error);
	});
});

var indexDocument = function(idNumber,doc){
	client.index({
	  index: config.INDEX,
	  type: 'document',
	  id: idNumber,
	  body: doc
	}, function (error, response) {
	  //console.log(response);
	});
};
