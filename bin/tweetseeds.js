const mongoose = require("mongoose");
const Auth = require("../models/user");
const Tweet = require("../models/tweet");


mongoose.connect("mongodb://localhost/twitter-lab-development").then(() => console.log("Conectado"));

const tweets = [
    {
        tweet: "Hola",
        user_id: "",
        user_name: ""
    },
    {
        tweet: "Hola2",
        user_id: "",
        user_name: ""
    },
    {
        tweet: "Hola3",
        user_id: "",
        user_name: ""
    }
]

Tweet.collection.drop();


Auth.find().exec((err, users) => {

    tweets.forEach( c => {
        c.user_id = users[0]._id;
        c.user_name = users[0].username;
        let tw = new Tweet(c);
        tw.save((err, tweets) => {
            if (err) {
                throw err;
            }
            console.log(`Tweet saved ${tweets.tweet}`);
            mongoose.disconnect();
        })
    });

})
