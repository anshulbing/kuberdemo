var express = require("express");
var app = express();

app.get('/', function(req, res){
    res.send('{"response: "Hello from HOMEPAGE"}');
});

app.get('/app1', function(req, res){  
    res.send('{"response: "Hello from APP-1"}');
});

app.get('/app2', function(req, res){
    res.send('{"response: "Hello from APP-2"}');
});

app.listen(process.env.PORT || 3000);
module.exports = app; 