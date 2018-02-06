const mongoose = require("mongoose");
const Auth = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

mongoose.connect("mongodb://localhost/twitter-lab-development").then(() => console.log("Conectado"));

const salt = bcrypt.genSaltSync(bcryptSalt);

const auth = [
  { username: 'John', password: bcrypt.hashSync("123", salt) },
  { username: 'John1', password: bcrypt.hashSync("123", salt) },
  { username: 'John2', password: bcrypt.hashSync("123", salt) }
]

Auth.collection.drop();

auth.forEach(c => {
  let au = new Auth(c);
  au.save((err, auth) => {
    if (err) {
      throw err;
    }
    console.log(`User saved ${auth.username}`);
    mongoose.disconnect();
  })
});