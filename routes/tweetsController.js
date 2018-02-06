const express = require("express");
const tweetsController = express.Router();
const User = require("../models/user");
const Tweet = require("../models/tweet");
const moment = require("moment");
// other code


// tweetsController.get("/index", (req, res, next) => {
//     res.render(
//         "tweets/index",
//         { username: req.session.currentUser.username }
//     );
// });



tweetsController.get("/new", (req, res, next) => {
    res.render("tweets/new",
        { username: req.session.currentUser.username });
});


tweetsController.post("/", (req, res, next) => {
    const user = req.session.currentUser;

    User.findOne({ username: user.username }).exec((err, user) => {
        if (err) { return; }

        const newTweet = new Tweet({
            user_id: user._id,
            user_name: user.username,
            tweet: req.body.tweetText
        });

        newTweet.save((err) => {
            if (err) {
                res.render("tweets/new",
                    {
                        username: user.username,
                        errorMessage: err.errors.tweet.message
                    });
            } else {
                req.session.currentUser = user;
                res.render("tweets/index", { username: req.session.currentUser });
            }
        });
    });
});




tweetsController.get("/index", (req, res, next) => {
    User
      .findOne({ username: req.session.currentUser.username })
      .then((user) => {
  
        Tweet.find({ user_id: user._id })
          .sort({ created_at: -1 })
          .exec((err, tweets) => {
            res.render("tweets/index", {
              tweets,
              moment,
              username: user.username,
              session: req.session.currentUser
            });
          });
      });
  });
  

module.exports = tweetsController;