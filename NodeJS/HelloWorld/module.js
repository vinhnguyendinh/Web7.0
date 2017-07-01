console.log('Include module.js');

const fs = require('fs');

// function readFile() {
//   let result = fs.readFileSync('helloworld.txt', 'utf-8');
//   console.log(result);
// }

let readFile = () => {
  let result = fs.readFileSync('helloworld.txt', 'utf-8');
  console.log(result);
}

module.exports = {
  readFile : readFile
}
