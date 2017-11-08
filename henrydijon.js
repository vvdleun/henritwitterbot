load("include/henriai.js");
load("include/connectionvalidator.js");

// Twitter API stuff
var apiKey = "xxx";
var apiSecret = "yyy";
var accessToken = new Token(
		"yyy", 
		"zzz");

var ServiceBuilder = Java.type("org.scribe.builder.ServiceBuilder");
var TwitterApi = Java.type("org.scribe.builder.api.TwitterApi");
var Token = Java.type("org.scribe.model.Token");
var OAuthRequest = Java.type("org.scribe.model.OAuthRequest");
var Verb = Java.type("org.scribe.model.Verb");
var BufferedReader = Java.type("java.io.BufferedReader");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var Timer = Java.type("java.util.Timer");
var TimerTask = Java.type("java.util.TimerTask");
var Thread = Java.type("java.lang.Thread");

HenriDijonBot = function() {
	this._service = null;
	this._accessToken = null
	this._displayIncomingData = false;
	this._ai = null;
	this._updateTimer = null;
	this._connectionValidator = new ConnectionValidator(3);
}

HenriDijonBot.prototype = {
	run: function() {
		this._ai = new HenriAI();
		this._initToken();
		var stream = this._getTwitterUserStream();
		this._updateTimer = this._initUpdateTimer();
		this._mainLoop(stream);		
	},
	
	_initUpdateTimer: function() {
		var timer = new Timer("UpdateTimer", true);
		var botThis = this;
		var ignore = false;
		timer.schedule(new TimerTask() {
			run: function() { 
			    if (ignore)
					return;
				
				// Check connection and halt on too many problems
				// My provider seems to close connections every now and then.
				print('INFO: Validating connection...');
				if (!botThis._connectionValidator.isConnectionOK()) {
					print("WARNING: Did not receive data from Twitter since last validation!");
					if (botThis._connectionValidator.isConnectionUnstable()) {
					    print("FATAL ERORR: Too long no valid Twitter data. Quitting");
						print("Sleeping for a minute...");
						ignore = true;
						Thread.sleep(60000);
					    exit(1);
					}
				} else {
					print('INFO: Validation OK');
				}
			}				
		}, 0, 1000 * 30);	
		return timer;		
	},
	
	_initToken: function() {
		this._service = new ServiceBuilder()
			.provider(TwitterApi.class)
			.apiKey(apiKey)
			.apiSecret(apiSecret)
			.build();
		this._accessToken = accessToken;		
	},
	
	_getTwitterUserStream: function() {
		var request = new OAuthRequest(Verb.GET, "https://userstream.twitter.com/1.1/user.json");
		request.addQuerystringParameter("delimited", "false");
		request.addQuerystringParameter("with", "user");

		this._service.signRequest(this._accessToken, request);
		var response = request.send();
		return response.getStream();		
	},
	
	_postTwitterUpdate: function(tweet, replyStatusId) {
		// return;
		
		var request = new OAuthRequest(Verb.POST, "https://api.twitter.com/1.1/statuses/update.json");
		request.addQuerystringParameter("status", tweet);
		if (replyStatusId)
			request.addQuerystringParameter("in_reply_to_status_id", replyStatusId);
		this._service.signRequest(this._accessToken, request);
		return request.send();
	},
	
	_mainLoop: function(stream) {
		keepRunning = true;
		var reader = new BufferedReader(new InputStreamReader(stream));
		
		while (keepRunning) {
			while((line = reader.readLine()) != null) {
				if (this._displayIncomingData)
					print("Received: " + line);
				try {
					this._connectionValidator.reportConnectionOK();
					if (line) {
						var json = JSON.parse(line);
						this._handleIncomingData(json);
					}
				} catch (err) {
					this._handleError(err);
				}
			}
		}		
	},
		
	_handleIncomingData: function(json) {
		if (json["id_str"] && json["text"] && json["user"] && json["user"]["screen_name"]) {
			var user = json["user"]["screen_name"];
			var tweet = json["text"];
			var tweetId = json["id_str"];
			
			print(user + ": " + tweet  + "(" + tweetId + ")");
			if (user.toLowerCase() != "henridijon") {
				var msg = "@" + user + " " + this._queryHenri(tweet);
				this._postTwitterUpdate(msg, tweetId)
			};
			
		} else {
			print("Unknown: " + line);
		}
	},
	
	_queryHenri: function(msg) {
		return this._ai.queryHenri(msg);
	},
	
	_handleError: function(err) {
		print("ERROR: " + err);
		return false;
	}
	
}


var bot = new HenriDijonBot();
bot.run();

