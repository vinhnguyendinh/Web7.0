const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let questionSchema = new Schema({
  content : {
    type : String,
    require : true,
    default : ''
  },
  answer : {
    type : Number,
  },
  date : {
    type : Date,
  }
}, { collection : 'questions'});

mongoose.model('questions', questionSchema);

module.exports = {
  questionSchema
}
