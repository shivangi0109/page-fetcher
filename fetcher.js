const request = require('request');
const fs = require('fs');

// const arguments = process.argv.slice(2);
// console.log(arguments);

const url = process.argv[2];
const filePath = process.argv[3];

const download = (url, filePath) => {
  request.get(url, (error, response, body) => {
    if (error) {
      console.log('Error downloading resource:', error);
      return;
    }

    // console.log(body);

    fs.writeFile(filePath, body, err => {
      if (err) {
        console.error(err);
        return;
      }

      fs.stat(filePath, (error, stats) => {
        if (error) {
          console.error('Error retrieving file size:', error);
          return;
        }

        const fileSize = stats.size;
        console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
      });
    });
  });
};

download(url, filePath);