// server.js
// where your node app starts

// init project
const express = require('express')
const moment = require('moment') 
const app = express()

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

//define parameter after base url
app.param('date', function(request, response, next, date) {
  request.date = date;
  next();
});

//get the parameter sent after the url
app.get('/:date', function(request, response) {
  
  // this is where the fit hits the shan
  if (isNaN(parseInt(request.date))) { 
  var momentDate = moment(request.date);
  var unixDate = momentDate.unix();
  
  if (momentDate.isValid()) {
      //create natural date
      var naturalDate = momentDate.format("MMMM DD, YYYY");
      var dateJSON = { 
        "unix" : unixDate, 
        "natural" : naturalDate, 
      }
      response.send(JSON.stringify(dateJSON));
    }
  else {
    var dateJSON = {
        "unix" : null, 
        "natural" : null,      
      }
    response.send(JSON.stringify(dateJSON));
  }
    
  }
  //this is the end of the if statement where fit hits the shan so delete the above } and line 25 if something goes wrong
  else {
    var unixInt = parseInt(request.date);
    var momentDate = moment.unix(unixInt);
    var unixDate = unixInt;

    if (momentDate.isValid()) {
        //create natural date
        var naturalDate = momentDate.format("MMMM DD, YYYY");
        var dateJSON = { 
          "unix" : unixDate, 
          "natural" : naturalDate, 
        }
        response.send(JSON.stringify(dateJSON));
      }
    else {
      var dateJSON = {
          "unix" : null, 
          "natural" : null,      
        }
      response.send(JSON.stringify(dateJSON));
  }
    
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
  // check string for unix or natural date
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
