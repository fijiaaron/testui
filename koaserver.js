var koa = require('koa');
var app = koa();
var http = require('http');

app.use(timer);
app.use(logger);
app.use(results);


function * timer(next) {
	var start = new Date;
	yield next;
	var ms = new Date - start;
	this.set('X-Response-Time', ms + 'ms');
	this.set('Content-type', 'text/html');
}


function * logger(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
}

var testCases = [
	'start web app',
	'sign up new user',
	'login as existing user' ,
	'logout'
]

var PASS = 'PASS';
var FAIL = 'FAIL';
var SKIP = 'SKIP';
var NOT_RUN = undefined;
var testResults = [
	PASS,
	FAIL,
	SKIP,
	NOT_RUN
]

function * results() {
	var body = ""

	body +=  "\n<h2>Test Results\n </h2>";

	body += "\n<ul>\n";

	for (test in testCases) {
		body += "\n<li>\n";
		body += `${test} : ${testCases[test]} : ${testResults[test]}`;
		body += "\n</li>\n";
	}
	body += "\n</ul>\n";

	this.body = body;
}




app.on('error', function(err, ctx){
  console.error('server error', err, ctx);
});



// app.listen(3000);
http.createServer(app.callback()).listen(3000);

console.log("listening on 'http://localhost:3000'")
