var static = require('node-static')
 
var port = 13000

var file = new static.Server('./public')

var staticRequestHandler = function (request, response) {
	request.addListener('end', function () {
		file.serve(request, response);
	}).resume()
}

require('http').createServer(staticRequestHandler).listen(port)


console.log(`static server listening on http://localhost:${port}`)