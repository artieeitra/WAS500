const port = 3000;
const http = require("http");
const httpStatusCodes = require("http-status-codes");
const router = require("./router");
const fs = require("fs");

const plainTextContentType = {
  "Content-Type": "text/plain",
};
const htmlContentType = {
  "Content-Type": "text/html",
};
const customReadFile = (file, res) => {
  fs.readFile(`./${file}`, (errors, data) => {
    if (errors) {
      console.log("Error reading the file...");
    }
    res.end(data);
  });
};

router.get("/", (req, res) => {
    res.writeHead(httpStatusCodes.StatusCodes.OK, htmlContentType);
    customReadFile("views/index.html", res);
});
router.get("/index.html", (req, res) => {
  res.writeHead(httpStatusCodes.StatusCodes.OK, htmlContentType);
  customReadFile("views/index.html", res);
});
router.get("/Lab1-booklist.html", (req, res) => {
    res.writeHead(httpStatusCodes.StatusCodes.OK, htmlContentType);
    customReadFile("views/Lab1-booklist.html", res);
});
router.get("/Lab1-We.html", (req, res) => {
  res.writeHead(httpStatusCodes.StatusCodes.OK, htmlContentType);
  customReadFile("views/Lab1-We.html", res);
});
router.get("/Lab1-animalfarm.html", (req, res) => {
    res.writeHead(httpStatusCodes.StatusCodes.OK, htmlContentType);
    customReadFile("views/Lab1-animalfarm.html", res);
  });
  router.get("/Lab1-1984.html", (req, res) => {
    res.writeHead(httpStatusCodes.StatusCodes.OK, htmlContentType);
    customReadFile("views/Lab1-1984.html", res);
  });
  router.get("/Lab1-contact.html", (req, res) => {
    res.writeHead(httpStatusCodes.StatusCodes.OK, htmlContentType);
    customReadFile("views/Lab1-contact.html", res);
  });
  router.get("/Lab1-survey.html", (req, res) => {
    res.writeHead(httpStatusCodes.StatusCodes.OK, htmlContentType);
    customReadFile("views/Lab1-survey.html", res);
  });
  router.get("/Lab1-honesty.html", (req, res) => {
    res.writeHead(httpStatusCodes.StatusCodes.OK, htmlContentType);
    customReadFile("views/Lab1-honesty.html", res);
  });
router.post("/", (req, res) => {
  res.writeHead(httpStatusCodes.StatusCodes.OK, plainTextContentType);
  res.end("POSTED");
});
http.createServer(router.handle).listen(3000);
console.log(`The server is listening on port number: ${port}`);