const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

let fileMenuHtml = path.join(__dirname, '../public/index.html');

router.get('/', (req, res) => {
  res.sendFile(fileMenuHtml);
})

router.post('/', (req, res) => {

  /// Cách 1 - Dùng file text
  // let file_path = path.join(__dirname, 'questionss.txt');
  //   fs.appendFile(file_path, req.body.question + '\n', (err) => {
  //       if (err) throw err;
  //       console.log('Question appened successfully');
  //       res.sendFile(file_path);
  //   });

  /// Cách 2 - Lưu file JSON
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

  res.send(questionsList);
})

router.get('/:id', (req, res) => {
  let questionsList;
  try {
    questionsList = JSON.parse(fs.readFileSync('question.json', 'utf-8'));
  } catch (exception) {
    console.log(exception);
    questionsList = [];
  }

  let result = questionsList[req.params.id];
  res.send(result);
});

module.exports = router;
