const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.json');
const formidable = require('express-formidable');

const usersController = require('./Controller/usersController');
const imagesController = require('./Controller/imagesController');

mongoose.connect(config.ConnectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connect db success");
  }
});

let app = express();

app.use(formidable());

app.use((req, res, next) => {
  console.log(req.fields);
  req.body = req.fields;
  next();
});

app.use('/api/user', usersController);
app.use('/api/image', imagesController);

app.listen(process.env.PORT || 6969, () => {
  console.log('App is running');
})
