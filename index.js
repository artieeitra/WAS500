const port = 3000; //Port by which the server can be accessed
const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs");

const sendErrorResponse = (res) => {   //The response if the Error is caught
  res.writeHead(httpStatus.StatusCodes.NOT_FOUND, {
    "Content-Type": "text/html",
  });
  customReadFile(`./views/error.html`, res); //Redirects to already prepared error page
};

const customReadFile = (file_path, res) => {  //The function that parses the requests and checks if it can find the file for it
  if (fs.existsSync(file_path)) {
    fs.readFile(file_path, (error, data) => {
      if (error) { //If it cannot triggers the Error response
        console.log("The following error has occured:",error,"Request for page",req.url," could not be found on the server");
        sendErrorResponse(res);
        return;
      }
      res.write(data); //If it can outputs the data of the file
      res.end();
    });
  } else {
    sendErrorResponse(res);
  }
};

const app = http.createServer();  // The routing function that is reponsible for creating the paths that will be given to main function in order to find the specific files
app.on("request", (req, res) => {
  let url = req.url;
  if (url.indexOf(".html") !== -1) {
    res.writeHead(httpStatus.StatusCodes.OK, {
      "Content-Type": "text/html",
    })
    console.log(req.url)
    console.log(req.method)
    console.log(req.headers);
    customReadFile(`./views${url}`, res);  //HTML files in views folder
  } else if (url.indexOf(".png") !== -1) {
    res.writeHead(httpStatus.StatusCodes.OK, {
      "Content-Type": "image/png",
    })
    console.log(req.url)
    console.log(req.method)
    console.log(req.headers);
    customReadFile(`./public/${url}`, res);  //PNG files in public folder
  } else {
    sendErrorResponse(res);
  }
});
app.listen(port); //Starting the Server with the predefined port 3000
console.log(`The web server can be accessed on port:${port}`); //Printing if the server has started