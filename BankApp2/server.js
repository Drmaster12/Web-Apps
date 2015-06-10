var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost/bankerdb', ['banklist']);
var bodyParser = require('body-parser');
var mongodb = require('mongodb').mongodb;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.get('/banklist', function (req, res) {
  console.log('I received a GET request');


  db.banklist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/banklist', function (req, res) {
  console.log(req.body);
  db.banklist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/banklist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.banklist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/banklist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.banklist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/banklist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.banklist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {
                    isActive: req.body.isActive, 
                    balance: req.body.balance, 
                    age: req.body.age, 
                    eyeColor: req.body.eyeColor, 
                    name: req.body.name, 
                    gender: req.body.gender, 
                    company: req.body.company, 
                    email: req.body.email, 
                    phone: req.body.phone, 
                    address: req.body.address}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});



app.listen(9000);
console.log("Server running on port 9000");

