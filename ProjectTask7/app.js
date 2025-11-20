const http = require("http");
const { readFileSync } = require("fs");

// Load all required files
const bookPage = readFileSync("./templates/html/page.html"); // Book page
const aboutPage = readFileSync("./templates/html/about.html"); // About page
const contactPage = readFileSync("./templates/html/contact.html"); // Contact page
const allStyles = readFileSync("./templates/css/styles.css"); // Global CSS file
const pageStyles = readFileSync("./templates/css/page.css"); // CSS book page file
const pageImage = readFileSync("./templates/img/book.jpg"); // Book image

// Create the server
const server = http.createServer((req, res) => {
  // req = the incoming request from the user
  // res = the response we send back
  const url = req.url;
  console.log(url);

  // home page HTML
  if (url === "/" || url === "/page") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(bookPage);
    res.end();
  }
  // about page HTML
  else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(aboutPage);
    res.end();
  }
  // contact page HTML
  else if (url === "/contact") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(contactPage);
    res.end();
  }
  // Main style
  else if (url === "/css/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(allStyles);
    res.end();
  }
  // Book page style
  else if (url === "/css/page.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(pageStyles);
    res.end();
  }
  // image/book
  else if (url === "/img/book.jpg") {
    res.writeHead(200, { "content-type": "image/jpg" });
    res.write(pageImage);
    res.end();
  }
  // 404 Page Not Found
  else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>page not found</h1>");
    res.end();
  }
});

// Start the server on port 3000
server.listen(3000);
