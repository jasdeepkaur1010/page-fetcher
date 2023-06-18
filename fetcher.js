const input = process.argv.slice(2);
const URL = input[0];
const localPath = input[1];

const request = require('request');
const fs = require('fs');


const fetcher = function (URL, localPath) {
  request(URL, (error, response, body) => {
   if(error) {
     console.log("Falied to download the file! ", error);
     return;
   }
   fs.writeFile(localPath, body, function(err) {
    if(err) throw err;
    fs.stat(localPath, (err, stats) => {
      if(err) {
        console.log(err);
        return;
      }
      console.log(`Downloaded and saved ${stats.size} bytes to ${localPath}`);
    });
  });
  });
}

if(!URL || !localPath) {
  console.log("Please enter a URL and localpath to download and save file");
} else {
  fetcher(URL, localPath);
}
