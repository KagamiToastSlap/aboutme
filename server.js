var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('aboutme', ['aboutme']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/aboutme', function (req, res) {
  console.log('I received a GET request');

  db.aboutme.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/aboutme', function (req, res) {
  console.log(req.body);
  db.aboutme.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/aboutme/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.aboutme.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/aboutme/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.aboutme.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/aboutme/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.aboutme.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(8080);
console.log("Server running on port 8080");