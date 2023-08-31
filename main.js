const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");
let HomePage;
let productPage;
let detailsPage;
let dataObject;

fs.readFile(`${__dirname}/dev-data/data.json`, "utf8", (error, data) => {
  if (error) {
    console.error("Error reading file:", error);
    return;
  }
  dataObject = JSON.parse(data);
  return dataObject;
});
fs.readFile(`${__dirname}/templates/index.html`, "utf8", (error, data) => {
  if (error) {
    console.error("Error reading file:", error);
    return;
  }
  return (HomePage = data);
});
fs.readFile(`${__dirname}/templates/product.html`, "utf8", (error, data) => {
  if (error) {
    console.error("Error reading file:", error);
    return;
  }
  productPage = data;
});

fs.readFile(`${__dirname}/templates/details.html`, "utf8", (error, data) => {
  if (error) {
    console.error("Error reading file:", error);
    return;
  }
  detailsPage = data;
});
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const query = url.searchParams;
  const pathname = url.pathname;
  if (pathname === "/" || pathname === "/index") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardsHtml = dataObject
      .map((el) => replaceTemplate(productPage, el))
      .join("");
    const output = HomePage?.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathname === "/details") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const id = parseInt(query.get("id"));
    console.log("ID:", id);
    const detail = dataObject[id];
    const output = replaceTemplate(detailsPage, detail);
    res.end(output);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(5500, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
