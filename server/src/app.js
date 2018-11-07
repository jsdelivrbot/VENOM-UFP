const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var Post = require("./models/posts");

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


const userRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');


// DB Setup
var mongoose = require('mongoose');

/*var DATABASE_URL = process.env.DATABASE_URL || 'http://localhost'
mongoose.connect(`mongodb://${DATABASE_URL}/posts`);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});*/

var PASS = 'richard2018';
var url = 'mongodb://richard:'+PASS+'@yellowpages-shard-00-00-yqbsq.mongodb.net:27017,yellowpages-shard-00-01-yqbsq.mongodb.net:27017,yellowpages-shard-00-02-yqbsq.mongodb.net:27017/yellowpages';
const opts = {
  replicaSet: 'yellowpages-shard-0',
  ssl:true,
  authSource:'admin'
};

var db = mongoose.connect(url,opts);

mongoose.Promise = global.Promise;

/**
 * Guardar Image dos Contactos
 */
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads')); // make the folder upload public to everyone



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // extrac json data and make easy to read



/**
 * Gerir as Rotas
 */
app.use('/user',userRoutes);
app.use('/posts',postsRoutes);



app.listen(process.env.PORT || 8081)
module.exports = app;