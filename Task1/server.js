// We need the http module to create an HTTP server
const http = require("http");

// We have a global variable for debugging
global.DEBUG = true;

// We create the server, passing in a callback function which will be invoked for each request
const server = http.createServer((request, response) => {
  // If the DEBUG flag is true, we log the request's URL and method
  if (global.DEBUG) console.log(request.url, request.method);

  // We use a switch statement to handle different request URLs
  switch (request.url) {
    case "/":
      // If the request URL is '/', we set the status code to 200 and end the response with a message
      response.statusCode = 200;
      console.log("User has landed");
      response.end(`/ route was requested.`);
      break;
    case "/weather":
      // If the request URL is '/weather', we do the same
      response.statusCode = 200;
      console.log("User has decided to view the weather");
      response.end(`/weather route was requested.`);
      break;
    case "/movies":
      // If the request URL is '/movies', we also do the same
      response.statusCode = 200;
      console.log("User wants to check out some movies");
      response.end(`/movies route was requested.`);
      break;
    default:
      // If the request URL is anything else, we set the status code to 404 and end the response with a message
      response.statusCode = 404;
      console.log("Where is the user going? " + request.url);
      response.end(`404 error: The requested route is not available.`);
      break;
  }
});

// We set the server to listen on port 3000 and on localhost
// When the server is ready, we log a message to the console
server.listen(3000, "localhost", () => {
  console.log("Server is listening on port 3000.");
});
