const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let questionSchema = new Schema({
  _id : {
    type : Number
  },
  content : {
    type : String,
    require : true,
    default : ''
  },
  yes : {
    type : Number,
    default : 0
  },
  no : {
    type : Number,
    default : 0
  },
  date : {
    type : Date
  }
}, { collection : 'questions'});

module.exports = mongoose.model('questions', questionSchema);
