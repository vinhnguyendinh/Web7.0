const fs = require('fs');
const express = require('express');
const questionRouter = require('./modules/question.js');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.urlencoded({ extended : true }))
app.use('/question', questionRouter);

app.listen(6969, () => {
  console.log('App is running');
})
