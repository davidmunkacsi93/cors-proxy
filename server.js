var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");

var app = express();

app.use(bodyParser.json());

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    req.header("access-control-request-headers")
  );

  if (req.method === "OPTIONS") {
    // CORS Preflight request.
    res.send();
  } else {
    var targetURL = req.header("Target-URL");
    if (!targetURL) {
      res.send(500, {
        error: "There is no Target-Endpoint header in the request"
      });
      return;
    }
    request(
      {
        url: targetURL + req.url,
        method: req.method,
        json: req.body,
        headers: { Authorization: req.header("Authorization") }
      },
      function(error, response, body) {
        if (error) {
          console.error("error: " + response.statusCode);
        }
      }
    ).pipe(res);
  }
});

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function() {
  console.log("Server listening on port " + app.get("port"));
});
