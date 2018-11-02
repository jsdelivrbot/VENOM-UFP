const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var Post = require("../models/posts");

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// DB Setup
var mongoose = require('mongoose');

var DATABASE_URL = process.env.DATABASE_URL || 'http://localhost'
mongoose.connect(`mongodb://${DATABASE_URL}/posts`);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

// SERVER Setup 
app.get('/posts', (req, res) => {
  Post.find({}, 'nome morada', function (error, posts) {
    if (error) { console.error(error); }
    res.send({
      posts: posts
    })
  }).sort({_id:-1})
});

 
// Post Endpoints
app.post('/posts', (req, res) => {
  var db = req.db;
  var nome = req.body.nome;
  var morada = req.body.morada;
  var fone = req.body.fone;
  var codigopostal = req.body.codigopostal;
  var freguesia = req.body.freguesia;
  var latitude = req.body.latitude;
  var new_post = new Post({
    nome: nome,
    morada: morada,
    fone: fone,
    codigopostal: codigopostal,
    freguesia: freguesia,
    latitude: latitude
  })

  new_post.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

// Fetch single post
app.get('/post/:id', (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, 'nome morada fone codigopostal freguesia latitude', function (error, post) {
    if (error) { console.error(error); }
    res.send(post)
  })
})

// Update a post
app.put('/posts/:id', (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, 'nome morada fone codigopostal freguesia latitude', function (error, post) {
    if (error) { console.error(error); }

    post.nome = req.body.nome
    post.morada = req.body.morada
    post.fone = req.body.fone
    post.codigopostal = req.body.codigopostal
    post.freguesia = req.body.freguesia
    post.latitude = req.body.latitude
    post.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a post
app.delete('/posts/:id', (req, res) => {
  var db = req.db;
  Post.remove({
    _id: req.params.id
  }, function(err, post){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})


app.listen(process.env.PORT || 8081)
