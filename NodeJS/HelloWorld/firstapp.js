const fs = require('fs');
const anotherModule = require('./module');
const express = require('express');
const bodyParser = require('body-parser');
const questionRouter = require('./modules/question/question.js');

// fs.writeFileSync('helloworld.txt', 'Hello world !');
//
// anotherModule.readFile();
//
// console.log('Hello world');

let app = express();
app.use(bodyParser.urlencoded({ extended : true }))

app.get('/', (req, res) => {
  res.send('Welcome to the app');
})

app.use('/question', questionRouter);


app.get('/object', (req, res) => {
  let testObject = {
    a : "test",
    b : "abc"
  }
  res.send(testObject);
})

app.get('/redirect', (req, res) => {
  res.sendFile(__dirname + '/public/question.html');
})

app.listen(3000, () => {
  console.log('app is running');
})
