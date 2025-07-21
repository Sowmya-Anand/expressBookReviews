const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    let userf=users.filter((user)=>user.username===username);
    return userf.length>0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let valid=users.filter((user)=>user.username===username && user.password===password);
    return valid.length>0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const un=req.body.username;
    const pwd=req.body.password;
    if (!un || !pwd){
        return res.status(404).send('Error logging in');
    }
    if (authenticatedUser(un,pwd)){
        let accessToken=jwt.sign({
            data:pwd},'access',{expiresIn:60*60}
        );
        req.session.authorization={
            accessToken,un
        }
        return res.status(200).send('logged in');
    }else
    return res.status(300).send('invalid');
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn=req.params.isbn;
  books[isbn].reviews[req.session.authorization.username]=req.body.review;
  console.log(books[isbn]);
  return res.status(300).send('added');
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
