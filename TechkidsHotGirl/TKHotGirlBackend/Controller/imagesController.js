const express = require('express');
const Router = express.Router();

const imagesModel = require('../Model/imagesModel');

const numberImagesPerPage = 20;
const getAll = 'getAll';

// TODO create 4 method basic

// POST: Create image
Router.post('/', (req, res) => {
  imagesModel.CreateImage(req.body, (err, image) => {
    if (err) {
      res.status(500);
      res.send('Error');
    } else {
      res.status(201);
      res.send('Image created');
    }
  });
});

// GET: :id : Get image with id or get all image
Router.get('/:id', (req, res) => {
  let params = req.params.id;
  if (params == getAll) {
    imagesModel.GetAllImage(numberImagesPerPage, (err, images) => {
      if (err) {
        res.status(500);
        res.send('Error');
      } else {
        res.status(200);
        res.send(images);
      }
    });
  } else {
    imagesModel.GetImageWithId(params, (err, image) => {
      if (err) {
        res.status(500);
        res.send('Error');
      } else {
        res.status(200);
        res.send(image);
      }
    });
  }
});

Router.get('/getAll/:id', (req, res) => {
  imagesModel.GetAllImageWithPage(req.params.id, numberImagesPerPage, (err, images) => {
    console.log(req.params.id);
    if (err) {
      res.status(500);
      res.send('Error');
    } else {
      res.status(200);
      res.send(images);
    }
  });
});

// Put image by id
Router.put('/:id', (req, res) => {
  imagesModel.UpdateImageWithId(req.params.id, req.body, (err) => {
    if (err) {
      res.status(500);
      res.send('Error');
    } else {
      res.status(200);
      res.send('Update image successfully');
    }
  });
});

// Delete image by id
Router.delete('/:id', (req, res) => {
  imagesModel.DeleteImageWithId(req.params.id, (err) => {
    if (err) {
      res.status(500);
      res.send('Error');
    } else {
      res.status(200);
      res.send('Delete image successfully');
    }
  });
});

module.exports = Router;
