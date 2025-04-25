const fs = require('fs').promises;

fs.writeFile('./temp.txt', 'Line 1\n') // write line 1
  .then(() => {
    return fs.writeFile('./temp.txt', 'Line 2\n', { flag: 'a' }); // write line 2
  })
  .then(() => {
    return fs.writeFile('./temp.txt', 'Line 3\n', { flag: 'a' }); // write line 3
  })
  .then(() => {
    return fs.writeFile('./temp.txt', 'Line 4\n', { flag: 'a' }); // write line 4
  })
  .then(() => {
    return fs.writeFile('./temp.txt', 'Line 5\n', { flag: 'a' }); // write line 5
  })
  .then(() => {
    return fs.readFile('./temp.txt', 'utf8'); // read the file back out
  })
  .then((data) => {
    console.log(data); // log the data to the screen
  })
  .catch((error) => {
    console.log("An error occurred: ", error);
  });