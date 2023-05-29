// Import http module to create server
const http = require("http");

// Create server using createServer()
const server = http.createServer((request, response) => {
  // Use a switch statement to handle routing
  switch (request.url) {
    case "/":
      response.write("Home page");
      console.log("User visited the home page");
      break;
    case "/about":
      response.write("About page");
      console.log("User has visited the about page");
      break;
    case "/contact":
      response.write("Contact page");
      console.log("User has visited the contact page");
      break;

    default:
      response.write("404: Page Not Found");
      console.log("User tried to visit unknown page: " + request.url);
      break;
  }
  // End the response process
  response.end();
});

// Listen to port 3000 for connections
server.listen(3000);

// Log when server has started
console.log("Server running on port 3000");
