// Author: Jonathan Ivany
// Date: 2023-05-29

// We need the http module to create an HTTP server
const http = require("http");
const fs = require("fs");
const EventEmitter = require("events");
const { writeToLog } = require("./logEvents");
// Load routes file we made for routing
const routes = require("./routes.js");
// We have a global variable for debugging
global.DEBUG = true;
class MyEmitter extends EventEmitter {}

// We create the server, passing in a callback function which will be invoked for each request
const server = http.createServer((request, response) => {
  // If the DEBUG flag is true, we log the request's URL and method
  if (global.DEBUG) console.log(request.url, request.method);

  let path = "./views";
  // We use a switch statement to handle different request URLs
  switch (request.url) {
    case "/":
      // If the request URL is '/', we set the status code to 200 and end the response with a message
      path += "/index.html";
      response.statusCode = 200;
      console.log("User has landed");
      myEmitter.emit("homeAccessed"); // Emit the "homeAccessed"
      writeToLog("Home route was accessed."); // Write to log
      routes.indexPage(path, response);
      break;
    case "/weather":
      // If the request URL is '/weather', we do the same
      path += "/weather.html";
      response.statusCode = 200;
      console.log("User has decided to view the weather");
      myEmitter.emit("weatherAccessed"); // Emit the "weatherAccessed" event
      writeToLog("Movies route was accessed."); // Write to log
      routes.weatherPage(path, response);
      break;
    case "/movies":
      // If the request URL is '/movies', we also do the same
      path += "/movies.html";
      response.statusCode = 200;
      console.log("User wants to check out some movies");
      myEmitter.emit("moviesAccessed"); // Emit the "moviesAccessed" event
      writeToLog("Movies route was accessed."); // Write to log
      routes.moviePage(path, response);
      break;
    default:
      // If the request URL is anything else, we set the status code to 404 and end the response with a message
      if (fs.existsSync(path)) {
        routes.handleStaticFile(request, response);
      } else {
        path += "/notfound.html";
        response.statusCode = 404;
        console.log("Where is the user going? " + request.url);
        writeToLog(`Unknown page was requested: ${request.url}`); // Write to log
        routes.notFoundPage(path, response);
      }
      break;
  }
});

const myEmitter = new MyEmitter();

// Set up listeners for each event

myEmitter.on("homeAccessed", () => {
  console.log("Home route was accessed.");
});

myEmitter.on("weatherAccessed", () => {
  console.log("Weather route was accessed.");
});

myEmitter.on("moviesAccessed", () => {
  console.log("Movies route was accessed.");
});

// We set the server to listen on port 3000 and on localhost
// When the server is ready, we log a message to the console
server.listen(3000, "localhost", () => {
  console.log("Server is listening on port 3000.");
});
