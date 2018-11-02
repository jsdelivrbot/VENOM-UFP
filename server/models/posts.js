var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  nome: String,
  morada: String,
  fone: String,
  codigopostal: String,
  freguesia: String,
  latitude: String
});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;