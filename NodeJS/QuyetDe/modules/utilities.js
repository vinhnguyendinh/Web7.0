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

module.exports = {
  saveQuestionList,
  getQuestionList
}
