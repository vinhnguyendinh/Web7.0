const fs = require('fs');

var saveQuestionList = function(questionsList) {
  fs.writeFileSync('question.json', JSON.stringify(questionsList));
}

var getQuestionList = function() {
  let questionsList;
  try {
    questionsList = JSON.parse(fs.readFileSync('question.json', 'utf-8'));
  } catch (exception) {
    console.log(exception);
    questionsList = [];
  }

  if (!questionsList) {
    questionsList = [];
  }

  return questionsList;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  saveQuestionList,
  getQuestionList,
  getRandomInt,
}
