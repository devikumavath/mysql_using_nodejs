const express = require("express");
const mysql2 = require("mysql2");

// create connection
const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mysql_using_nodejs",
});

//connect

db.connect((error) => {
  if (error) throw error;

  console.log("connected to mysql");
});

const app = express();

// create db
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE mysql_using_nodejs";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    console.log(result);
    res.send("database created");
  });
});

// create table

app.get("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT , title VARCHAR(255) , body VARCHAR(255)  , PRIMARY KEY(id))";

  db.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);

    res.send("post table created");
  });
});

// insert post 1
app.get("/addpost1", (req, res) => {
  let post = {
    title: "post one",
    body: "this is post one",
  };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send("post 1 added");
  });
});

// insert post 1
app.get("/addpost2", (req, res) => {
  let post = {
    title: "post two",
    body: "this is post two",
  };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send("post 2 added");
  });
});

//select post
app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send("posts fetehed");
  });
});

//select one post
app.get("/getposts/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send("post fetehed");
  });
});

//update  post
app.get("/updatepost/:id", (req, res) => {
  let newTitle = "updated title";
  let sql = `UPDATE posts SET title = '${newTitle}'  WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send("post updated");
  });
});

//delete  post
app.get("/deletepost/:id", (req, res) => {
  let sql = `DELETE FROM  posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send("post deleted");
  });
});

app.listen("3000", () => {
  console.log(`server listening on port 3000`);
});
