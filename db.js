const mongoose = require("mongoose");

// Define mongoDB connection URL
const mongoURL =
    "mongodb+srv://sauvikchatterjee9:BPKVyEmM9Y65fyCg@test.bzidpja.mongodb.net/";

const dbName = "user";

// setup mongoDB connection
mongoose.connect(mongoURL + dbName);

//Get the default connection
const db = mongoose.connection;

//Some event listeners for debugging purpose
db.on("connected", () => {
    console.log("Database connected");
});
db.on("error", () => {
    console.log("Error connecting to Database");
});
db.on("disconnected", () => {
    console.log("Database disconnected");
});

module.exports = db;

//BPKVyEmM9Y65fyCg
