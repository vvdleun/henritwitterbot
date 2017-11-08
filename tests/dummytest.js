load("include/qunit_nashorn.js");

var testMethod = function(b) {
    return b;
}

QUnit.test("testOK1", function(a) {
    var res = testMethod(true);
    a.equal(res, true);
})


QUnit.test("testOK2", function(a) {
    var res = testMethod(false);
    a.equal(res, false);
})


QUnit.test("testFails1", function(a) {
    var res = testMethod(false);
    a.equal(res, true);
})


QUnit.test("testFails2", function(a) {
    var res = testMethod(true);
    a.equal(res, false);
})


QUnit.load();