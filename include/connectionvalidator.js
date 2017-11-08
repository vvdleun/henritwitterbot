var AtomicInteger = Java.type("java.util.concurrent.atomic.AtomicInteger");


ConnectionValidator = function(countUnacceptable) {
	this._isInitialized = false;
	this._curCount = new AtomicInteger(0);
	this._lastCount = -1;
	this._problems = 0;
	this._problemsTreshhold = countUnacceptable ? countUnacceptable : 0;
}

ConnectionValidator.prototype = {
	
	init: function() {
		this._isInitialized = false;
		this.isConnectionOK();
	},
	
	reportConnectionOK: function() {
		var newCount = this._curCount.incrementAndGet();		
		print("INFO: Connection OK");
	},
	
	isConnectionOK: function() {
		if (!this._isInitialized) {
			this._isInitialized = true;
			this._lastCount = this._curCount.get();
			return true;
		}
				
		var res;
		if (this._lastCount == this._curCount.get()) {
			// No Twitter update since last time!
			this._problems += 1;
		} else {
			// Reset problem counter
			this._problems = 0;
		}
		
		//print("Last time checked: " + this._lastCount);
		//print("Now              : " + this._curCount.get());
		//print("Problems         : " + this._problems);
		
		this._lastCount = this._curCount.get();
		
		return this._problems == 0;
	},
	
	isConnectionUnstable: function() {
		return this._problems > this._problemsTreshhold;
	}

}