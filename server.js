const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((request, response) => {
  const ext = path.extname(request.url);

  if (ext === "") {
    // it's a route, not a file
    switch (request.url) {
      case "/":
        serveStaticFile(response, "views/index.html", "text/html");
        break;
      case "/weather":
        serveStaticFile(response, "views/weather.html", "text/html");
        break;
      case "/movies":
        serveStaticFile(response, "views/movies.html", "text/html");
        break;
      default:
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end("404: Page Not Found");
        console.log("User tried to visit an unknown page: " + request.url);
        break;
    }
  } else {
    // it's a file, serve it
    let contentType;

    switch (ext) {
      case ".css":
        contentType = "text/css";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
      case ".jpeg":
        contentType = "image/jpeg";
        break;
      case ".html":
        contentType = "text/html";
        break;
      case ".js":
        contentType = "text/javascript";
        break;
      // add more file types if needed
      default:
        contentType = "application/octet-stream";
        break;
    }

    serveStaticFile(response, request.url, contentType);
  }
});

function serveStaticFile(response, filePath, contentType) {
  const fullPath = path.join(__dirname, filePath);

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      response.statusCode = 500;
      response.end(`Error: ${err}`);
    } else {
      response.writeHead(200, { "Content-Type": contentType });
      response.end(data);
    }
  });
}

server.listen(3000);
console.log("Server running on port 3000");
