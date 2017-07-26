const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  avatar : {
    type : String
  },
  email : {
    type : String
  },
  active : {
    type : Boolean,
    default : true
  }
}, { timestamp: { createdAt: 'created_at'} }, { collection : 'users'});

const userModel = mongoose.model('users', usersSchema);

// TODO
// Tao 4 ham co ban Create, Read, Update, Delete

// Create
const CreateUser = function(userInfo, callback) {
  let newUser = {
    username : userInfo.username,
    password : userInfo.password,
    avatar : userInfo.avatar,
    email : userInfo.email
  }

  userModel.create(newUser, (err, user) => {
    if (err) {
      callback(err);
    } else {
      callback(null, user);
    }
  })
}

// Read
const GetUserById = function(id, callback) {
  userModel.findById(id, (err, user) => {
    if (err) {
      callback(err);
    } else {
      let result = {
        username : user.username,
        email : user.email,
        avatar : user.avatar
      }
      callback(null, result);
    }
  });
}

// Update
const UpdateUserById = function(id, otherUserModel, callback) {
  userModel.findById(id, (err, user) => {
    if (err) {
      callback(err);
    } else {
      user.username = otherUserModel.username;
      user.password = otherUserModel.password;
      user.email = otherUserModel.email;
      user.avatar = otherUserModel.avatar;
      user.active = otherUserModel.active;

      user.save((err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      });
    }
  });
}

// Delete
const DeleteUserById = function(id, callback) {
  var query = { _id : id };
  userModel.remove(query, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

module.exports = {
  CreateUser,
  GetUserById,
  UpdateUserById,
  DeleteUserById
}
