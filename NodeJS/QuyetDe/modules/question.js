const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

let fileIndexHtml = path.join(__dirname, '../public/index.html');
let fileAskHtml = path.join(__dirname, '../public/ask.html');


router.get('/api/question/3', (req, res) => {
  res.sendFile(fileAskHtml);
})

router.post('/api/question/3', (req, res) => {
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

  question = {
    content : req.body.question
  };

  questionsList.push(question);
  fs.writeFileSync('question.json', JSON.stringify(questionsList));

  res.redirect(`/api/question/1`);
  console.log('did redirect');
})

router.get('/api/question/:id', (req, res) => {
  let result = getQuestionAtIndex(req.params.id);
  res.send(result);
});

router.get('/question/:id', (req, res) => {
  let result = getQuestionAtIndex(req.params.id);
  res.send(result);
});

var getQuestionAtIndex = function(index) {
  let questionsList;
  try {
    questionsList = JSON.parse(fs.readFileSync('question.json', 'utf-8'));
  } catch (exception) {
    console.log(exception);
    questionsList = [];
  }

  let result;
  if (index < 0 || index > questionsList.length-1) {
    console.log('out of bounds');
    result = 'out of bounds';
  } else {
    result = questionsList[index];
  }

  return result;
}

module.exports = router;
