load("include/jvm-npm.js");
var QUnitModule = require("include/qunit.js");

QUnit = QUnitModule.QUnit

QUnit.log(function(d) {
    if (!d.result) {
      var message = d.name + "\tFAIL" + d.source;
      message += " actual: " + d.actual + " <> expected: " + d.expected;
      print(message);
    }		
})


QUnit.done(function(d) {
    print("time:\t",d.runtime,"ms");
    print("total:\t",d.total);
    print("passed:\t",d.passed);
    print("failed:\t",d.failed);
})

