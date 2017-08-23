const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.json');
const formidable = require('express-formidable');
const http = require('http');
const socketIO = require('socket.io');

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

const server = http.createServer(app);
const IO = socketIO(server);

let socketList = [];

IO.on('connection', (socket) => {
  socket.on('connectSocket', (username) => {
    console.log();
  });

  console.log('socket connect: ', socket.id);
  socket.emit('Response', 'Response from server');
  socket.on('ButtonPressed', (message) => {
    IO.emit('GotMessage', { name: socket.id, message: message });
  });
  socket.broadcast.emit('broadcast', { message: `${socket.id} just connect` });

  socket.on('Join', (room) => {
    socket.join(room.roomName);
  })

  socket.on('messageToRoom', (message) => {
    TO.to(message.room).emit('RoomMessage', `From server : ${message.message}`);
  })

})

app.use(formidable());
app.use((req, res, next) => {
  console.log(req.fields);
  req.body = req.fields;
  next();
});

app.get('/', (req, res) => {

})
app.use('/api/user', usersController);
app.use('/api/image', imagesController);

server.listen(process.env.PORT || 6969, () => {
  console.log('App is running');
})
