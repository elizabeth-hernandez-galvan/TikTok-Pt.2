// index.js
// This is our main server file
"use strict"
// include express
const express = require("express");

// gets data out of HTTP request body 
const bodyParser = require('body-parser');
// create object to interface with express
const fetch = require("cross-fetch");
const db = require('./sqlWrap');
const app = express();

// make all the files in 'public' available on the Web
app.use(express.static("public"));


// print incoming url on console
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
})

//Load on MyVideos instead of TikTok.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/MyVideos.html");
});


app.get("URL",
  function(req, res) {
    console.log(req.params);
    let url = req.params.url;
    next();
  })

// a module that gets json out of the request body; not needed yet, but very useful!
app.use(express.json());

// gets text out of the HTTP body and into req.body; again not needed in this example
app.use(bodyParser.text());


// This is where the server receives and responds to POST requests
app.post("/videoData", async function(req, res, next) {
  const tableContents = await dumpTable();
  if (tableContents.length >= 8.0) { 
    res.send("database full");
    return;
  }
  else {
    console.log("Server recieved a post request at", req.url);
    let choice = req.body;
    console.log("responding", choice);
    res.send(choice);
    await insertAndCount(choice);
  }
})

app.get("/getMostRecent", async function(req, res) {
  console.log("In get recent");
  var sql = 'SELECT * from VideoTable WHERE flag = 1';
  let result = await db.get(sql, []);
  console.log(result);
  res.json(result);
})

app.get("/getList", async function(req, res) {
  console.log("In get list");
  const tableContents = await dumpTable();
  console.log(tableContents);
  res.json(tableContents);
}) 

app.post("/deleteVideo", async function(req, res) {
 let nickname = req.body.nickname;
 await db.run("delete from VideoTable where nickname=?", [nickname]);
})

// Need to add response if page not found!
app.use(function(req, res) {
  res.status(404);
  res.type('txt'); res.send('404 - File ' + req.url + ' not   found');
});
// end of pipeline specification


// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, () => {
  console.log("The static server is listening on port " + listener.address().port);
});

  async function insertAndCount(vidObj) {
    var sql = "UPDATE VideoTable SET flag = 0 WHERE flag = 1";
    await db.run(sql, []);
    await insertVideo(vidObj);
    console.log(await dumpTable());
  }

  insertAndCount(vidObj)
    .catch(function(err) { console.log("DB error!", err) });


  getVideo(vidObj.nickname)
    .then(function(result) {
    })
    .catch(function(err) {
      console.log("SQL error", err)
    });




// ******************************************** //
// Define async functions to perform the database 
// operations we need
// An async function to insert a video into the database
async function insertVideo(v) {
  const sql = "insert into VideoTable (url,nickname,userid,flag) values (?,?,?,TRUE)";

  await db.run(sql, [v.url, v.nickname, v.username]);
}

//an async function to get a video's database row by its nickname
async function getVideo(nickname) {
  // warning! You can only use ? to replace table data, not table name or column name.
  const sql = 'select * from VideoTable where nickname = ?';
  let result = await db.get(sql, [nickname]);
  return result;
}

// an async function to get the whole contents of the database 
async function dumpTable() {
  const sql = "select * from VideoTable"
  let result = await db.all(sql)
  return result;
}
