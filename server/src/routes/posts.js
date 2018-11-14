const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Post = require('../models/posts');

//const upload = multer({dest:'./uploads'});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
       // cb(null,Date.now()+'-'+file.originalname)
       cb(null,file.originalname)
    }
});

const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); //save it
    } else {
        cb(null, false); //reject a file
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 //5mb
    },
    fileFilter: fileFilter
});

router.get('/', (req, res) => {
  Post.find(function (error, posts) {
    if (error) { console.error(error); }
    res.send({
      posts: posts
    })
  }).sort({_id:-1})
});

/**
 * Caminho dos contactos em Cache para o carousel
 */
router.get('/cache', (req,res) => {
  Post.find()
  .exec()
  .then(docs => {
    console.log(docs);
    res.status(200).json(docs);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });

});


  
  /**
  /**
   * Procura por freguesia
   */
  router.get('/:nome/:freguesia', (req, res) => {
  
    Post.find({nome: req.params.nome, freguesia: req.params.freguesia}, function (error, posts) {
      if (error) { console.error(error); }
      res.send({
        posts: posts
      })
    }).sort({_id:-1})
  });

    /**
   * Procura por nome
   * Request URL http://localhost:8081/posts/contactos/feup
   */
  router.get('/:nome', (req,res) => {

    Post.find({nome: req.params.nome})
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
  
  });
   
  // Post Endpoints
  router.post('/', upload.single('contactImage'), (req, res) => {
    const  new_post = new Post({
      nome: req.body.nome,
      morada: req.body.morada,
      fone: req.body.fone,
      codigopostal: req.body.codigopostal,
      freguesia: req.body.freguesia,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      contactImage: req.file.path,
    });
  
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
  router.get('/:id', (req, res) => {
    var db = req.db;
    const id = req.params.id;

    Post.findById(id, 'nome morada fone codigopostal freguesia latitude longitude contactImage', function (error, post) {
      if (error) { console.error(error); }
      res.send(post)
    })
  })

  
  
  // Update a post
  router.put('/:id', (req, res) => {
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
  router.delete('/:id', (req, res) => {
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

  module.exports = router;