const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

let fileMenuHtml = path.join(__dirname, '../public/index.html');

router.get('/', (req, res) => {
  res.sendFile(fileMenuHtml);
})

router.post('/', (req, res) => {
  let file_path = path.join(__dirname, 'questionss.txt');
    fs.appendFile(file_path, req.body.question + '\n', (err) => {
        if (err) throw err;
        console.log('Question appened successfully');
        res.sendFile(file_path);
});
})

module.exports = router;
