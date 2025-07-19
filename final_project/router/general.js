const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const un=req.body.username;
    const pwd=req.body.password;
    if (!un || !pwd){
        return res.status(304).send('Enter details');
    }
    const exist=users.filter((user)=>{return user.username===un});
    if (exist.length>0){
        return res.send('no');
    }
    users.push({"username":un,"paassword":pwd});
    return res.status(200).send('registered!');
});
public_users.get('/user',(req,res)=>{
    res.send(users);
})
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(300).json(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn=req.params.isbn;
  return res.status(300).send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author=req.params.author;
  for (let key in books){
    if (books[key].author===author){
        return res.status(300).send(books[key]);
    }
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn=req.params.isbn;
  res.send(books[isbn].reviews) 
});

module.exports.general = public_users;
