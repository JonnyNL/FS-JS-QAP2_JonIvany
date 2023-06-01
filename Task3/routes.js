// Author: Jonathan Ivany
// Date: 2023-05-29

const fs = require("fs");
const path = require("path");

// Handler for index page
function indexPage(path, response) {
  if (DEBUG) console.log("index.html page was requested.");
  displayFile(path, "text/html", response);
}

// Handler for movie page
function moviePage(path, response) {
  if (DEBUG) console.log("index.html page was requested.");
  displayFile(path, "text/html", response);
}

// Handler for weather page
function weatherPage(path, response) {
  if (DEBUG) console.log("index.html page was requested.");
  displayFile(path, "text/html", response);
}

// Handler for not found page
function notFoundPage(path, response) {
  if (DEBUG) console.log("Unknown page was requested.");
  displayFile(path, "text/html", response);
}

// Handler for serving static files
function handleStaticFile(request, response) {
  const filePath = path.join(process.cwd(), "views", request.url);
  const contentType = getContentType(filePath);

  displayFile(filePath, contentType, response);
}

// Get the content type based on file extension
function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case ".js":
      return "text/javascript";
    case ".css":
      return "text/css";
    case ".json":
      return "application/json";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    case ".mp4":
      return "video/mp4";
    default:
      return "application/octet-stream";
  }
}

// Read and display the file contents
function displayFile(filePath, contentType, response) {
  fs.readFile(filePath, function (err, data) {
    if (err) {
      console.log(err);
      response.statusCode = 404;
      response.end();
    } else {
      if (DEBUG) console.log("file was served.");
      response.writeHead(200, { "Content-Type": contentType });
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
  handleStaticFile,
};
