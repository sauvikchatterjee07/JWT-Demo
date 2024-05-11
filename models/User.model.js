const mongoose = require("mongoose");

// Define the Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    job: {
        type: String,
        enum: ["service", "business", "other"],
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
