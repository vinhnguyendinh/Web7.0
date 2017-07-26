const config = require('./config.json');
const mongoose = require('mongoose');

mongoose.connect(config.ConnectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connect db success");
  }
})

const usersModel = require('./Model/usersModel');
const imagesModel = require('./Model/imagesModel');

/*******************
Test for user model
*******************/

var createUser = function() {
  userInfo = {
    username : 'Long',
    password : 'dddd',
    avatar : 'http://',
    email : 'long@gmail.com'
  }

  usersModel.CreateUser(userInfo, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
    }
  });
}

// let id = "597748d006a2e806211b9a5e";

var getUserById = function(id) {
  usersModel.GetUserById(id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
    }
  });
}

var updateUserById = function(id) {
  otherusersModel = {
    username : 'Tai',
    password : 'hahahahhaha',
    avatar : 'http://',
    email : 'taind@gmail.com'
  }
  usersModel.UpdateUserById(id, otherusersModel);
}

var deleteUserById = function(id) {
  usersModel.DeleteUserById(id, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Delete user successfully');
    }
  });
}

/*******************
Test for image model
*******************/

var createImage = function() {
  let newImage = {
    imageUrl : 'http://',
    view : 0,
    likes : [],
    content : 'abc',
    title : 'abc',
    tag : ['#photo', '#linhtinh']
  }

  imagesModel.CreateImage(newImage, (err, image) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Create image success");
    }
  })
}
// createImage();

var getImageById = function(id) {
  imagesModel.GetImageWithId(id, (err, image) => {
    if (err) {
      console.log(err);
    } else {
      console.log(image);
    }
  });
}
// getImageById('59785275af66fe033187e22d');

var updateImageWithId = function(id) {
  let newImage = {
    imageUrl : 'http://ghhgvgh',
    view : 100,
    likes : [],
    content : 'Vinh dep trai',
    title : 'Travel',
    tag : ['#photo', '#dulich']
  };

  imagesModel.UpdateImageWithId(id, newImage, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Update image successfully');
    }
  });
}
// updateImageWithId('59785275af66fe033187e22d');

var deleteImageWithId = function(id) {
  imagesModel.DeleteImageWithId(id, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Delete image successfully');
    }
  });
}
// deleteImageWithId('59785275af66fe033187e22d');
