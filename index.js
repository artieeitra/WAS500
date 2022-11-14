const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs");

const sendErrorResponse = (res) => {
  res.writeHead(httpStatus.StatusCodes.NOT_FOUND, {
    "Content-Type": "text/html",
  });
  customReadFile(`./views/error.html`, res);
};

const customReadFile = (file_path, res) => {
  if (fs.existsSync(file_path)) {
    fs.readFile(file_path, (error, data) => {
      if (error) {
        console.log(error);
        sendErrorResponse(res);
        return;
      }
      res.write(data);
      res.end();
    });
  } else {
    sendErrorResponse(res);
  }
};

const app = http.createServer();
app.on("request", (req, res) => {
  let url = req.url;
  if (url.indexOf(".html") !== -1) {
    res.writeHead(httpStatus.StatusCodes.OK, {
      "Content-Type": "text/html",
    });
    customReadFile(`./views${url}`, res);
  } else if (url.indexOf(".png") !== -1) {
    res.writeHead(httpStatus.StatusCodes.OK, {
      "Content-Type": "image/png",
    });
    customReadFile(`./public/${url}`, res);
  } else {
    sendErrorResponse(res);
  }
});
app.listen(port);
console.log(`The web server can be accessed on port:${port}`);