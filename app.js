/**
 * By Karrar S. Honi
 */
const version = "1.0";

// Server module
let http = require('http');
// Routes to handle the requests
const Web = require('./Routes/web');
// notes
console.log("Starting the server version "+version);
// Starting server
http.createServer(function (req, res) {
    // server page header
    res.writeHead(200, {'Content-Type': 'text/html'});
    // routes object
    var web = new Web(req);
    // response write
    res.write(web.main());
    // end request response
    res.end();
}).listen(8080);