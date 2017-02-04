//REQUIRE
var express = require('express');
var app = express();
var district = require('congressional-district-finder');


//PORT
var port = 3000 || process.env.PORT;

//MIDDLEWARE
app.use(express.static('public'));

//ADDRESS TO DISTRICT ROUTE
app.get('/mycongress/dis/:address', function(req, res){
  district.getDistrictByAddress(req.params.address).then(
    function(result){
      console.log(req.params.address);
      console.log(result.isMatched);
      console.log(result.district.name);
      console.log(result.district.districtCode);
      res.send({match: result.isMatched, code: result.district.districtCode, name: result.district.name});
    });
});

//LISTEN
app.listen(port, function(){
  console.log('CONGRESS APP FRONTEND RUNNING ON PORT: ', port);
});
