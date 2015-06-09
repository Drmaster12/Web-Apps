var express = require('express');
var app = express();
var mongojs = require('mongojs');
var dbs = mongojs('mongodb://localhost/NBA/players', ['players']);
var db = mongojs('mongodb://localhost/NBA/teams', ['teams']);
var bodyParser = require('body-parser');

var mongodb = require('mongodb').mongodb;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.get('/players', function (req, res) {
  console.log('I received a GET request');


  dbs.players.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/players', function (req, res) {
  console.log(req.body);
  db.players.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/players/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  dbs.players.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/players/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  dbs.players.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/players/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  dbs.players.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {
                    firstName: req.body.firstName, 
                    lastName: req.body.lastName, 
   }},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});


app.get('/teams', function (req, res) {
  console.log('I received a GET request');


  db.teams.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/teams', function (req, res) {
  console.log(req.body);
  db.teams.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/teams/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.teams.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/teams/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.teams.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/teams/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.teams.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {
                    teamName: req.body.teamName, 
                    abbreviation: req.body.abbreviation, 
                    simpleName: req.body.simpleName, 
                    location: req.body.location,
                    teamId: req.body.teamId }},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});



app.listen(8000);
console.log("Server running on port 8000");

