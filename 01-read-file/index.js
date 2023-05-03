const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'text.txt');

fs.readFile(filePath, 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});
