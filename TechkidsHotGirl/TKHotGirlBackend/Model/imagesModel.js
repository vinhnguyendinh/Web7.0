const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const imagesSchema = new Schema({
  imageUrl : {
    type : String,
    required : true,
    // TODO Phai co dinh fang http://
  },
  posterId : {
    type : ObjectId,
  },
  view : {
    type : Number,
    default : 0
  },
  likes : {
    type : [{
      type : ObjectId
    }]
  },
  content : {
    type : String
  },
  title : {
    type : String
  },
  tag : {
    type : [{
      type : String
    }]
  },
  createdAt : {
    type : Date,
    default : Date.now
  }
}, { collection: 'images' });

const imagesModel = mongoose.model('images', imagesSchema);

// Create image
const CreateImage = function(image, callback) {
  let newImage = {
    imageUrl : image.imageUrl,
    posterId : image.posterId,
    view : image.view,
    likes : image.likes,
    content : image.content,
    title : image.title,
    tag : image.tag,
    createdAt : image.createdAt
  };

  imagesModel.create(newImage, (err, image) => {
    if (err) {
      callback(err);
    } else {
      callback(null, image);
    }
  });
}

// Read image
const GetImageWithId = function(id, callback) {
  imagesModel.findById(id, (err, image) => {
    if (err) {
      callback(err);
    } else {
      callback(null, image);
    }
  });
}

const GetAllImage = function(maximumImage, callback) {
  imagesModel.find().limit(maximumImage).sort({ createdAt: -1}).exec((err, images) => {
   if (err) {
     callback(err);
   } else {
     callback(null, images);
   }
  });
}

const GetAllImageWithPage = function(page, maximumImage, callback) {
  imagesModel.find().limit(maximumImage).sort({ createdAt: -1}).skip((page-1) * maximumImage).exec((err, images) => {
    if (err) {
      callback(err);
    } else {
      callback(null, images);
    }
  });
}
// Update image
const UpdateImageWithId = function(id, otherImage, callback) {
  imagesModel.findById(id, (err, image) => {
    if (err) {
      callback(err);
    } else {
      // Update property
      image.imageUrl = otherImage.imageUrl;
      image.posterId = otherImage.posterId;
      image.view = otherImage.view;
      image.likes = otherImage.likes;
      image.content = otherImage.content;
      image.title = otherImage.title;
      image.tag = otherImage.tag;
      image.createdAt = otherImage.createdAt;

      // Save
      image.save((err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    }
  });
}

// Delete image
const DeleteImageWithId = function(id, callback) {
  var query = { _id: id };
  imagesModel.remove(query, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

module.exports = {
  CreateImage,
  GetImageWithId,
  GetAllImage,
  GetAllImageWithPage,
  UpdateImageWithId,
  DeleteImageWithId
}
