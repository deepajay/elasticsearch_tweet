STEPS:

1. To download the dependencies, run:
	npm install 

2. Set the value of different parameters in config.js.

3. Run 'CrawlTweets/indexTweets.js' to stream tweets corresponding to keyword mentioned in config.js. The count of tweets is equal to the count mentioned in config.js. The code also indexes each tweet data to elasticsearch instance.

4. To start the webapp, run:
	node app.js

Sample query:
	url/api/search?query="QUERY"