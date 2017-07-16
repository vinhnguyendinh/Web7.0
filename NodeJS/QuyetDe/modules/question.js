const express = require('express');
const path = require('path');
const fs = require('fs');
const utilities = require('../modules/utilities.js');
const questionModel = require('./questionSchema.js')
const router = express.Router();

router.post('/:id', (req, res) => {
  let id = req.params.id;
  let query = { _id: id};

  questionModel.findOne(query, (err, question) => {
    if (err) {
      console.log(err);
    } else {
      if (req.body.answer == "yes") {
        question.yes = question.yes ? question.yes + 1 : 1;
      } else {
        question.no = question.no ? question.no + 1 : 1;
      }

      let update = { $set: { yes: question.yes, no: question.no} }
      questionModel.update(query, update, (err, question) => {
        if (err) {
          console.log(err);
        } else {
          console.log(question);
        }
      })
    }
  })

  res.redirect(`/question/${id}`);
})

router.get('/', (req, res) => {
  questionModel.find(function (err, questions) {
    if (err) {
      console.error(err);
      return;
    }
    let randomNumber = utilities.getRandomInt(0, questions.length-1);
    let result = questionMap[randomNumber];

    res.render('home', {
      id      : randomNumber,
      content : result.content
    })
  })
})

router.post('/', (req, res) => {
  questionModel.count({}, (err, count) => {
    if (err) {
      console.log(err);
    } else {

      let question = {
        _id     : count++,
        content : req.body.question,
        yes     : 0,
        no      : 0
      };

      questionModel.create(question, (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect(`/question/${doc._id}`);
        }
      })

    }
  });
})

module.exports = router;
