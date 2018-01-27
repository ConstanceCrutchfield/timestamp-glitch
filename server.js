// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(cors());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response, next) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:dateValue", function(request, response) {
  //gets request data for date
  var dateValue = request.params.dateValue;
  //date formatting options
  var dateFormat = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  //add logic to check for valid unix and date
  if(isNaN(dateValue)){
    var naturalDate = new Date(dateValue);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateFormat);
    
    var unixDate = new Date(dateValue).getTime()/1000;
  }
  else {
    var unixDate = dateValue;
    var naturalDate = new Date(dateValue * 1000);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateFormat);
  
  }
  response.json({unix: unixDate, natural: naturalDate});
});

app.get("/dreams", function (request, response, next) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
