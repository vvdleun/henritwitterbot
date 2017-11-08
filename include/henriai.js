HenriAI = function() {
	this._words = [];
	this._index = -1;
	this._error = false;
	this._eol = true;
	this._upTime = Date();
	this._countQueries = 0;
	this._unknownQueries = 0;

    // Words that are completely ignored by the parser
	this._skipWords = [
		"a", "an", "about", "the", "henri", "colonel", "dijon", "to", "\t", "\n", 
		"\r", "me", "your", "my", "please"];

	// Synonyms for some words. When encountered, they will be replaced with
	// the mapped word.
	this._replaceWords = {
		"doc's": "the",
		"doctor's": "the",
		"wilbur's": "the",
		"actress": "gloria",
		"attorney": "clarence",
		"butler": "jeeves",
		"cook": "celie",
		"doc": "wilbur",
		"doctor": "wilbur",
		"gertrude": "gertie",
		"lil": "lillian",
		"rudolph": "rudy",
		"beauregard": "dog",
		"blaze": "horse",
		"polly": "parrot",
	}

	// Answers when we don't understand the tweet
	this._unknownInput = [
		"Try that one again. It didn't make much sense.",
		"Try another way to say that"
	];

    // Answers when Henri does not recognize the subject	
	this._unknownCombination = [
		"What difference does it make?",
		"So what?",
		"What do I care about it?",
	    "I don't know anything about it",
	    "What about it?",
		"I wouldn't know about it.",
		"How would I know?!",
		"You think that interests me?",
		"Who cares?",
		"I don't care about it"
	];

    // Answers when someone tries to TALK TO henri	
	this._talk = [
		// Act 1
		"What are you doing in my room?", //, young lady?",
		"You have no right to be in here!",
		"Quit looking at my things! Get out of here!",
		"Don't young people respect people's privacy anymore! Go on... scat!",
		// Act 2 + 3 + 4 + 6 + 7
		"Quit coming in my room!", // young lady
		"I ain't in the mood to talk to you!",
		"I don't even know you! Why're you coming in here!",
		// Act 5 (Argue with lil)
		"Will it do any good to ask you to leave my room?!",
		"This is my private room!", // young lady
		"Can't you get it through your thick skull?! I have nothin' to say to you!",
	]

    // Maps "action" (currently "ask" or "tell") with subjects and possible
	// answers.
	this._conversations = {
		"ask": {
			"estate": [
				"I ain't talkin' to you about this estate.",
				"This place is none of your business!", // young lady
				"Mind your own business about my place!",
				"My estate is none of your business!",
				"This estate ain't none of your concern!",
				"This old plantation is none of your concern!",
				"Keep your nose out of things!",
			],
			"ghost": [
				"Stay out of the cemetery!", // young lady!",
				"I don't wanna hear any more talk about ghosts, ya hear?!",
				"You're daft... there ain't no ghosts!",
				"I don't wanna hear any more talk about ghosts!",
				"Stop that talking about ghosts!", // young lady
				"Keep out of that old cemetery!",
				"There ain't no ghosts around here!",
			],
			"celie": [
				"Yeah, go find Celie! Pester her!",
				"Go talk to Celie! Maybe she can put up with you!",
				//"It ain't your concern what my cook does!",
				"Go bother the cook, why don'tcha?",
				"Go find Celie. Pester her!",
				"Go talk to her yourself!",
				"Leave the poor woman alone!",
			],
			"wilbur": [
				"What do you care about my doctor?!",
				"My health is none of your concern!",
				//"My doctor is my business!", // young woman
				"Why do you care about my health?",
				"My health is my concern!",
				"The state of my health is none of your concern",
			],
			"gertie": [
				"My relation with Gertrude is my own affair",
				//"Gertrude is none of your business",
				"I have nothing to say about that woman!",
				"I'm not talkin' about HER!",
				"I don't want to talk about her.. especially with you!",				
				//"She ain't none of your business",
			],
			"sarah": [
				"I don't know who 'Sarah' is!",
				"I don't know anybody named 'Sarah'!",
				"I don't know anything about this 'Sarah'!",				
				"That name doesn't mean anything to me!",
				"I don't know who she is, and I don't care!",
				"Don't know about the girl.. and don't intend to!",
			],
			"dog": [
				"Don't you tease that old dog!", // Young lady
				"Don't you be messin' with my dog!",
				"Leave my dog alone, will ya!",
				"I don't want you messin' with my dog!",
				"I don't want you bothering my dog!", // young woman
				"That old dog doesn't want to be bothered by you!",
			],
			"clarence": [
				"Leave my attorney out of this!",
				"There ain't nothin' you need to know about my business affairs!",
				"Stay out of my private affairs!",
				"My attorney is none of your business!",
				"Stay out of my affairs!",
				"My business is MY business!",
			],
			"ethel": [
				"My sister is none of your business!",
				"I'm not discussing my sister with YOU!",
				"My sister's problems are none of your business!",
				"I am NOT going to discuss my sister with YOU!",
				"My problems with my sister are my own business.. not YOURS!",
				"My sister's problems are my business!", // young lady
				"I'm NOT talking about my sister with YOU!",
			],
			"gloria": [
				"I don't think much of Gloria.",
				"My niece is none of your concern!",
				"I don't wish to discuss my niece with you!",
				"There ain't nothin' you need to know about my niece!",
				"She ain't none of your business!",
				"You don't need to know anything about my niece!",
				"There ain't anything you need to know about my niece!",
			],
			"lillian": [
				"Did Lillian put you up to this?!",
				"Why don't you spend time with HER rather than ME?!",
				"Does my niece know what you're up to?", // young lady
				"What does Lillian have to do with this?!",
				"She's your friend! Talk to her yourself!",
				"If you're so curious about Lillian, go ask her yourself!",
				//"Don't ask me about Lillian!",
			],
			"bag": [
				"Stay away from it!",
				"That's not for you to mess with!",
				"Stay away from other people's things!",			
				"The doctor bag is none of your business!",
				"Just leave well enough!", // young lady
			],
			"horse": [
				"Leave my horse alone!",
				"Stay out of my stable!", // Young lady
				"You don't need to be messin' with my horse!",
				"Leave the horse alone!",
				"Stay away from the horse! You might get hurt!",
				"Stay out of the stable!",
				"My horse don't take to strangers!",
			],
			"fifi": [
				"I don't pay much attention to the woman.",
				"I hardly even notice her.",
				"One of these days you're gonna stick your nose in where it don't belong and you'll pay for it!", 
				"Are you spying on my maid?!",
				"You don't need to be concerned about my maid!",
				"There is no reason to talk about my maid!",
				"Quit spying on my maid!",
			],
			"jeeves": [
				"Go ask him himself!",
				"Yes! Go pester Jeeves!",
				"Go bother Jeeves!",
				"You don't need to concern yourself with my butler.",
				"Who cares what he does?",
				"You don't need to worry about the hired help!",
			],
			"rudy": [
				"What is your interest in that young whippersnapper?",
				"If you're so interested in Rudy, go find him!",
				"If you like him so much, go find HIM and leave ME alone!",
				"That young rascal is none of your concern!",
				"You should have nothing to do with my newphew!",
				"What do you care about my nephew? You gotta crush on him or something?",
				"Go talk to him yourself if you care so much!",
			],
			"parrot": [
				"Keep away from my parrot, you hear?!",
			],
			"bible": [
				"What bible?",
				"There ain't no old bible around here!",
				"I don't know nothin' about any old bibles!",
				"There ain't no old bibles here!",
				"I dont even know what you're talkin' about!",
				"I haven't seen any old bibles.",
				"I tell you there ain't no bible here!",
			],
			"cigar": [
				"Do you hate cigars? Good!", // Young lady
				"Never mind about my cigar!",
				"What do you care about my cigar, anyway?!",
				"Are you gettin' into my cigars?!",
				//"My cigars ain't your business!",
				//"Stay out of my cigars!",
				"What do you care about my cigars?!",
			],
			"celie,lillian": [
				"I don't care what they do!",
				"They're probably in the kitchen. Go find them there.",
				"What do you care what they do?!",
				"I don't pay any attention to them.",
				"I don't pay any attention to what they do!",
				"What do you care about them?!",
				"It ain't up to you WHAT they do!",
				],
			"clarence,gloria": [
				"Just leave people alone!", //young lady
				"Let my guests be!", // young lady
				"Let people handle their own affairs!",
				"Quit pestering my guests!",
				"Leave people alone!",
				"Mind your own business!", // young lady
				"People have a right to their privacy!", // young woman
			],
			"clarence,rudy": [
				"Their business is their business. Keep out of it!",
				"Just leave them be! Don't go puttin' your nose in where it don't belong!",			
				"It ain't up to you to be worryin' about them!",
				"This is MY business. Not YOURS!",
				"I'm NOT going to talk about them!",
			],
			"ethel,lillian": [
				"My family is my own affair!",
				"I'm not discussing my family with YOU!",
				"Just stay out of this!",
				"They are none of your concern!",
				"They'll do fine without your meddling!",
				"Confound it! Stop bein' so snoopy!", //girl
				],			
			"fifi,rudy": [
				"You're just trying to cause trouble!", // young lady
				"Why would you think I would care, anyway?!",
				"There ain't nothin' going on, ya hear?!",
				"You're lookin' for trouble, aren'tcha?!",
				"What goes on around here is none of your business!", // young lady
				//"Mind your own business", // young lady
			],
			"gloria,rudy": [
				"Mind your own business!",
				"You have no business sticking your nose into our lives", // young woman
				"My family is my own business!",
				"I'm not discussing my niece and nephew with YOU!",
				"Quit poking our nose into family business!", // girl!
				"My family is MY business",
			],
			"clarence,wilbur": [
				"My attorney and my doctor are none of your affair!",
				"Why are you so interested in my associates?", // young woman
				"They are MY business, not YOURS!",
				"Just let them be! Don't be puttin' your nose in where it don't belong!", // young woman
				//"What they do is NONE of your concern",
			],
			"clarence,gertie": [
				"What they do is none of your business!",
				"Leave my guests alone, confound it!",
				"Can't you leave people alone?!",
				"I ain't talkin' about them with YOU!",
				"They're my concern, not yours!",
				"There ain't nothing you need to know about them!",
			]			
		},
		"tell": {
			"estate": [
				"My estate is none of your business!",
				"Quit pokin' around my estate!",
				"Keep out of things around this estate!",
				"Just stay in the house. Quit wandering around!",
				"I ain't discussin' my property with you!",
				"Quit snooping around the place!",
				"This estate is none of your business!", // young lady
			],
			"ghost": [
				"You're crazy!", //, girl!
				"There ain't any ghosts!", // young lady
				"You're as loony as my niece Lillian!",
				"There ain't no ghosts in the cemetery!",
				"There ain't no durn ghosts!",
				"You're seeing things!", // young lady
				"I don't wanna hear about no ghosts!",
			],
			"celie": [
				"Stop pestering my cook!",
				"Just let her get her work done!",
				"The cook ain't none of your business!",
				"Quit botherin' my cook!",
				"She's off-duty now. Leave her alone.",
				"What about her, for pete's sake?!",
				//"She ain't none of your business",
			],
			"wilbur": [
				"Leave the man alone!", // young lady
				"I don't want my doctor bothered!",
				"Quit bothering my guests!",
				"Just leave the man alone!",
				"Take your stories elsewhere! I want nothing to do with your foolishness.", // Young lady
				"Just get out of here! I've had enough of your stupid stories!",
			],
			"gertie": [
				"I don't want to talk about her!",
				"My problems with Gertrude is my own business!",
				"Leave my guests alone!",
				"I don't want to discuss her!",
				"I don't care what she's doing!",
				"You're crazy! Why, you're just as crazy as Lillian!", //crazy girl
			],
			"sarah": [
				"I don't know, and I don't care, who 'Sarah' is!",
				"I have nothing to say about her!",
				"I don't know who she is. Leave me alone about her!",
				"I don't care about this person!",
				"I ain't interested in hearing about that girl!",
				"I don't have an overwhelming curiosity about the girl!",
				"I ain't discussin' nobody with you!",
			],
			"dog": [
				"Beauregard is too old to be played with. Leave him alone!",
				"Beauregard don't cotton to strangers. Just leave him alone!",
				"Don't be botherin' my dog!",
				"That's an old dog. Leave him alone!",
				"Leave my dog alone!",
				"Beauregard is an old dog. Just leave him alone!",
				"Just stay away from my dog!",
			],
			"clarence": [
				"You have no business spying on other people!",
				"Quit watching my guests!",
				"Quit pestering my guests!",
				"Leave my attorney alone!",
				"My attorney is none of your business!",
				"Quit spying on my attorney!", // young lady
				"Stop meddling in my attorney's affairs!",
			],
			"ethel": [
				"I'm not discussing my sister with you!",
				"I don't want to talk about my sister",
				"Stop watching my sister!",
				"What she does is none of your business!",
				"Ethel is no concern of yours!",
				"Leave my sister alone!", // Young woman
				"There's nothing you can tell me about my sister!",
			],
			"gloria": [
				"I don't care what she's doing!",
				"If you want someone to talk to, go talk to HER! Maybe she'll put up with you!",
				"Stop watching my guests!",
				"I don't give a hoot what that girl does!",
				"I'm tired of these games of yours!", // Young woman
				"You're crazy! I'm not falling for that!", // girl!
				"Get out of here! You think I'm going to fall for that!",
			],
			"lillian": [
				"I don't want to hear about that niece of mine!",
				"She's YOUR friend. Go find her!",
				"I don't want to talk about her!",
				"I've enough problems with her without YOU interfering!",
				"I know my niece better than you do!",
				"I don't care to discuss my niece with YOU!",
				"She's YOUR friend! What do I care?!",
			],
			"bag": [
				"Leave it alone!",
				"Leave the doctor bag alone!", //, young woman!",
				"That's NOT for you!",
				"That's not yours to play with!",
				"Just stay away from the doctor bag",
				],
			"horse": [
				"Stay out the stable, ya hear?!",
				"I'm warnin' you! You'd better stay away from that horse!",
				"My horse don't like strangers!",
				"Keep out of my stable!",
				"He's a mean horse! He might kick you!",
				"Don't go near the horse!",
				"Stay away from the horse!",
			],
			"fifi": [
				"Leave Fifi alone!",
				"Let the poor girl do her work!",
				"What my maid does is no concern of yours!",
				"Quit watching Fifi, 'er, my maid!",
				//"She ain't no concern of yours!",
				"I could care less about her.",
				"You think you're REAL funny, don'tcha!",
			],
			"jeeves": [
				"I don't need news reports on my servants!",
				"I think I know my butler better than YOU do!",
				"If you're so interested in my butler, go find him!",
				"My staff is MY business, not YOURS!",				
				"You shouldn't be concerned with my butler!",
				"I don't care to discuss the servants with YOU!",
				"You're just trying to get my goat, that's all you're doing!",
			],
			"rudy": [
				"What my nephew does is none of your concern!",
				"Perhaps Rudy will talk to you. I won't!", // Young lady
				"You seem to be awfully interested in my nephew!", // girl
				"Don't tell ME about HIM!",
				"I don't wish to discuss my nephew.",
				"I don't want to discuss my nephew.",
			],
			"parrot": [
				"I don't wanna hear you're botherin' my bird!"
			],
			"bible": [
				"If there is an old bible, it doesn't concern YOU!",
				"I don't like you snooping around my place!",
				"This ain't your house! Stop snooping around!",
				"Quit nosin' around my place!",
				"What do you think you're lookin' for, anyway?!",
				"There ain't no old bibles around here!",
				"I ain't interested in any old bibles!",
			],
			"cigar": [
				"What do you care about my old cigar butt?!",
				"Why do you have such an interest in my cigars?",
				"I don't care about an old cigar butt!",
				//"My cigars are my own business!",
			],
			"celie,lillian": [
				"So what? Lillian's always been a crybaby and Celie puts up with it.",
				"If Celie wants to put up with her, so be it!",
				"Why don't YOU go talk to Lillian?!",
				"What do you care what they do?!",
				"I don't care to hear it.",
				"I don't want to hear about them!",
			],
			"clarence,gloria": [
				"I'm not interested in what other people do!",
				"Confound it girl! Leave people alone!",
				"Quit spying on my guests!",
				"I don't want you spying on my guests!",
			],
			"clarence,rudy": [
				// "I don't care what they do.",
				"Stop bein' such a nosey-parker!",
				"You're awfully nosy, aren'tcha?",
				// They don't concern you
				"Just leave them alone!",
			],
			"ethel,lillian": [
				"What they do is their business, not yours!",
				"Just leave them alone!", // Young lady
				"I don't want to hear about them!",
				"I ain't discussing my family with YOU!",
				"They're MY family! I'll worry about them!",
				"My family is none of your business!",
				"Leave my family out of this!",
			],						
			"fifi,rudy": [
				"That young man is going to find himself in a peck o' trouble!",
				"There's some things you just can't overlook!",
				"I can handle it myself without YOUR help!",
				"My nephew is more trouble than he's worth!",
				"That nephew of mine had better leave well enough alone!",
				"What they do is none of my affair.",
				"Stop spreading your lies!", //girl
			],
			"gloria,rudy": [
				"I don't care what they do; and neither should YOU!",
				"They're MY family, not YOURS!",
				"My nephew and niece are none of your business!",
				"Don't concern yourself with MY family!",
				"What my family does is none of your concern.",
				"So what? They have a right to talk.",
				"Leave my family alone!",
			],
			"clarence,wilbur": [
				"They don't concern you!",
				"They have a right to their privacy!",				
				"Confound it, they don't concern you!",
				"Stop bein' such a nosey-parker!",
				"You're meddling in my affairs!",
			],
			"clarence,gertie": [
				"Mind your own business!",
				"I'm not going to listen to this!",
				"It ain't up to you!",
				"Quit watchin' the other guests!",
				"What business is it of yours?!",
				"Quit pestering us!",
				"What they do is NO concern of YOURS!",
			],
		},		
	};
}

HenriAI.prototype = {
	
	queryHenri: function(msg) {
		// Someone queries henri. Msg contains the full tweet that is sent.
		// Function will return a string that will be tweeted back as a reply.
		print("Input: '" + msg + "'");
		
		this._countQueries += 1
		this._index = -1;
		this._error = false;
		this._eol = false;
		this._words = msg.trim().split(" ");
		
		var sentence = this._getSentence();
		
		return sentence;
		
	},
	
	_getSentence: function(msg) {
		// This function tries to parse the input and return a valid response.

		// input will be null when the text is not understood.
		var input = this._extractInput();
		if (!input || !input[0]) {
			// Reply with a hardcoded message.
			this._unknownQueries += 1
			return this._chooseInput(this._unknownInput)
		}
		// When sentence was understood, input[0] will contain action ("ask"
		// or "tell" currently) and input[1] will contain a list with subjects
		// that can be matched with known subjects.
		var action = input[0];
		var subjects = input[1];

        // We have some hard-coded special queries. Handle them here.
        // Henri can return some statistics upon request.		
		var magicReply = this._handleDynamicQueries(action, subjects);
		if (magicReply)
			return magicReply;
	
        // Currently ASK, TELL and TALK actions are recognized.	
		if (action == "ask" || action=="tell") {
			var subjectKey = subjects.join(",")
			var msg = this._conversations[action][subjectKey];
			if (msg)
				return this._chooseInput(msg);
			
			return this._chooseInput(this._unknownCombination);
			

		} else if (action == "talk") {
			return this._chooseInput(this._talk);
		}

        // Mmmm...		
		return "not implemented yet";
			
	},

    // Choose random string from the list.
	_chooseInput: function(listAnswers) {
		var index = Math.floor((Math.random() * listAnswers.length));
		return listAnswers[index];
	},

    // We have one dynamic query, Henri will respond to "ASK HENRI ABOUT STATUS".
	_handleDynamicQueries: function(action, subjects) {
		if (action == "ask" && subjects.length == 1 && subjects[0] == "status")
			return "Up since " + this._upTime + ", handled " + this._countQueries + " tweets. Did not understand " + this._unknownQueries + " tweets.";
		return null;
	},

    // Parse each word. When an unrecognized word is encountered, 
	// stop by returning null. Otherwise returns array with two elements:
	// First element contains acion ("ask", "tell" and "talk"), second a list
	// with subjects.
	_extractInput: function(msg) {
		// Parse first word. This must be a valid action.
		var nextWord = this._nextWord("action");
 
		// Initialize return values
		var action = null;
		var subjects = [];

		// Handle "ASK ABOUT xxx" and "TELL ABOUT yyy" queries
		if (nextWord == "ask" || nextWord == "tell") {
			// Strange, after action nothing follows.
			if (this._eol)
				return null;
			
			action = nextWord;

			// First subject
			subjects.push(this._nextWord("subject1"));
			if (subjects.length == 0) {
				// Should be impossible, line was not eol at this point
				return;
			}

			// Did user enter more than one subject?
			var hasNextSubject = this._nextWord("and?") == "and"
			if (hasNextSubject) {
				if (this._eol) {
					// Weird. User specified " AND " but ended there.
					return null;
				}					
				// Next subject
				var subject2 =  this._nextWord("subject2");
				if (!subject2) {
					//print("ERR: No subject 2?");
					return null;
				}
				subjects.push(subject2);
			}
			
			if (!this._eol) {
				// User entered more text. Unfortunately, Henri does not have
				// the intelligence to understand it.
				return null;
			}
			
		} else if (nextWord == "talk") {
			// All accepted words are "dummies" and do not need parsing.
			// They all result in the same response.
			action = nextWord;
			if (!this._eol) {
				var dummy = this._nextWord("dummies?");
				if (dummy || !this._eol)
					return null;
			}			
		}
		
		// If more than one subject is entered, sort them, so we can match
		// them easily.
		if (subjects.length > 1)
			subjects.sort();
		
		return [action, subjects];
		
	},
	
	_nextWord: function(t) {
		// Function that parses a word. Words that must be replaced, according
		// to the table above, will result with the mapped word instead.
		// Words that must be ignored are skipped and not returned.
		//print("Search for " + t);
		//print("Words: " + this._words);
		var res = null;
		while (!this._eol && res == null) {			
			this._index++;
			
			var nextWord = this._words[this._index]
			if (!nextWord)
				break;
			nextWord = nextWord.toLowerCase();
			var replaceWord = this._replaceWords[nextWord];
			if (replaceWord)
				nextWord = replaceWord;
			// Skip some words, all @mentions and #hashtags.
			if (this._skipWords.indexOf(nextWord) >= 0 || nextWord.substr(0, 1) == "@" || nextWord.substr(0, 1) == "#") {
				continue;
			}
			res = nextWord;
		}
		this._eol = this._index >= this._words.length-1;			
		
		//print("Word: " + this._index);
		//print("Length: " + this._words.length);
		//print("Res: " + res);
		//print("EOL: " + this._eol);
		//print();
		return res;
	}	
}