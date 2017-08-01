const userModel = require('../Model/usersModel');
const express = require('express');
const Router = express.Router();

// TODO Create a router for 4 basic method
// POST : Create username
// GET :id : Get user by id
// PUT :id : Update user by id
// DELETE :id : Delete user by id

Router.post('/', (req, res) => {
  userModel.CreateUser(req.body, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.send('Error');
    } else {
      res.status(201);
      res.send('Account created');
    }
  });
});

Router.get('/:id', (req, res) => {
  userModel.GetUserById(req.params.id, (err, user) => {
    if (err) {
      res.status(500);
      res.send('Error');
    } else {
      res.status(200);
      res.send(user);
    }
  });
});

Router.put('/:id', (req, res) => {
  userModel.UpdateUserById(req.params.id, req.body, (err, user) => {
    if (err) {
      console.log(err);
    } else {

    }
  })
});

Router.delete('/:id', (req, res) => {

});

module.exports = Router;
