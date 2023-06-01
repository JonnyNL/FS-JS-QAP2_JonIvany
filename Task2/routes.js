const fs = require("fs");

function indexPage(path, response) {
  if (DEBUG) console.log("index.html page was requested.");
  displayFile(path, response);
}

function moviePage(path, response) {
  if (DEBUG) console.log("index.html page was requested.");
  displayFile(path, response);
}

function weatherPage(path, response) {
  if (DEBUG) console.log("index.html page was requested.");
  displayFile(path, response);
}

function notFoundPage(path, response) {
  if (DEBUG) console.log("Uknown page was requested.");
  displayFile(path, response);
}

function displayFile(path, response) {
  fs.readFile(path, function (err, data) {
    if (err) {
      console.log(err);
      response.end();
    } else {
      if (DEBUG) console.log("file was served.");
      response.writeHead(response.statusCode, { "Content-Type": "text/html" });
      response.write(data);
      response.end();
    }
  });
}

module.exports = {
  indexPage,
  moviePage,
  weatherPage,
  notFoundPage,
};
