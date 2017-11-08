load("include/qunit_nashorn.js");
load("../include/connectionvalidator.js");


QUnit.test("testInitialization", function(a) {
	var v = new ConnectionValidator(1);
	v.init();
	
	// No reported OK connection. So connection is not OK, but stable
	var testConnection = v.isConnectionOK();
	a.equal(testConnection, false);
	a.equal(v.isConnectionUnstable(), false);
	
	// Still no connection, now unstable
	var testConnection = v.isConnectionOK();
	a.equal(testConnection, false);
	a.equal(v.isConnectionUnstable(), true);
})


QUnit.test("testConnectionOK", function(a) {
	var v = new ConnectionValidator(0);
	v.init();
	
	// Report OK connection
	v.reportConnectionOK();
	
	// Check is also OK
	var testConnection = v.isConnectionOK();
	a.equal(testConnection, true);
	
	a.equal(v.isConnectionUnstable(), false);
})


QUnit.test("testNoConnection", function(a) {
	var v = new ConnectionValidator(1);
	v.init();
	
	// No reported OK connection
	// Poll #1 (not OK, but not unstable)
	var testConnection = v.isConnectionOK();
	a.equal(testConnection, false);
	a.equal(v.isConnectionUnstable(), false);
	
	// Poll #2 (now unstable as well)
	var testConnection = v.isConnectionOK();
	a.equal(testConnection, false);
	a.equal(v.isConnectionUnstable(), true);
})



QUnit.test("testConnectionFailedButWithinLimit", function(a) {
	var v = new ConnectionValidator(1);
	v.init();

	// Connection is OK
	v.reportConnectionOK();
	
	// First check is OK as well
	var testConnection = v.isConnectionOK();
	a.equal(testConnection, true);	
	a.equal(v.isConnectionUnstable(), false);	

	// Second check is not OK, there has not been a a reported connection
	// But limit = 1, so it is within limit
	var testConnection = v.isConnectionOK();
	a.equal(testConnection, false);	
	a.equal(v.isConnectionUnstable(), false);
})


QUnit.test("testConnectionFailedOutOfLimit", function(a) {
	var v = new ConnectionValidator(3);
	v.init();
	
	// Connection is OK
	v.reportConnectionOK();
	
	// Check #1: OK
	var testConnection = v.isConnectionOK();
	a.equal(testConnection, true);	
	a.equal(v.isConnectionUnstable(), false);	
	
	// Check #2: Not ok, but still stable, fail #1
	var testConnection = v.isConnectionOK();
	a.equal(testConnection, false);	
	a.equal(v.isConnectionUnstable(), false);	

	// Check #3: Not ok, but still stable, fail #2
	var testConnection = v.isConnectionOK();
	a.equal(testConnection, false);	
	a.equal(v.isConnectionUnstable(), false);	
	
	// Check #4: Not ok, but still stable, fail #3
	var testConnection = v.isConnectionOK();
	a.equal(testConnection, false);	
	a.equal(v.isConnectionUnstable(), false);	
	
	// Check #4: Not ok, now stable, fail #4
	var testConnection = v.isConnectionOK();
	a.equal(testConnection, false);	
	a.equal(v.isConnectionUnstable(), true);	
})


QUnit.test("testConnectionFailsThenOK", function(a) {
	var v = new ConnectionValidator(1);
	v.init();
	
	v.reportConnectionOK();
	
	// Check 1 OK
	var testConnection = v.isConnectionOK();
	a.equal(testConnection, true);	
	a.equal(v.isConnectionUnstable(), false);	
	
	v.reportConnectionOK();
	
	// Check 2 OK
	var testConnection = v.isConnectionOK();
	a.equal(testConnection, true);	
	a.equal(v.isConnectionUnstable(), false);	
	
	// Now connection fails
	var testConnection = v.isConnectionOK();
	a.equal(testConnection, false);	
	a.equal(v.isConnectionUnstable(), false);	
	
	// Now connection fails again, unstable
	var testConnection = v.isConnectionOK();
	a.equal(testConnection, false);	
	a.equal(v.isConnectionUnstable(), true);	
	
	// Connection is back!
	v.reportConnectionOK();
	
	// Now connection OK
	var testConnection = v.isConnectionOK();
	a.equal(testConnection, true);	
	a.equal(v.isConnectionUnstable(), false);	

	v.reportConnectionOK();
	
	// Connection OK
	var testConnection = v.isConnectionOK();
	a.equal(testConnection, true);	
	a.equal(v.isConnectionUnstable(), false);	
})

QUnit.load();