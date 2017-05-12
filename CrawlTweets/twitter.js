var twitter =require('twitter');
var client = new twitter({
	consumer_key:'Y9jB81h7hCFnKmYO1Bq3aRBmC',
	consumer_secret:'Xi6icO1DY5hh5Vxna3guSTn95Lj6OqYEwI13fMKBPCydWFvAIp',
	access_token_key:'748012242600398852-mzdIhyXk1vtiKmLN1ODS5MKuUPCw6XP',
	access_token_secret:'eJK2cSK7OS8JaetZqvhNjCdqTlCg8ltJqw8rMsrd23yt1'
});

var tweets=[];
var numberOfTweets = 100;
var keyword= 'Mayawati';

client.stream('statuses/filter', {track: keyword},  function(stream) {

	stream.on('data', function(tweet) {
	    console.log(tweets.length+":"+tweet.text);
	    var doc={
	    	text:tweet.text
	    };
	    tweets.push(doc);
	    if(tweets.length == numberOfTweets){
	    	stream.destroy();
	    }
	});
	stream.on('error', function(error) {
	    console.log(error);
	});
});

