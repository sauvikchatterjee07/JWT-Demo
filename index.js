const bodyParser = require("body-parser");
const express = require("express");
const User = require("./models/User.model.js");
const db = require("./db.js");
const app = express();
const port = 8000;
const privateKey = "s3cr3tk3y";

const jwt = require("jsonwebtoken");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(bodyParser.json());

app.post("/register", async (req, res) => {
    try {
        const data = req.body;
        const newUser = new User(data);

        await newUser.save();
        console.log(newUser, " saved successfully");
        res.status(200).json(newUser);
    } catch (err) {
        console.log(err);
        res.status(501).json({
            error: "couldn't save data",
        });
    }
});

app.post("/login", async (req, res) => {
    const { name, phonenumber } = req.body;

    const newUser = await User.findOne({ name, phonenumber });

    if (newUser) {
        const token = jwt.sign({ name: newUser.name }, privateKey, {
            expiresIn: "1h",
        });
        res.status(200).json({ token: token });
    } else {
        res.status(501).json({
            error: "couldn't save data",
        });
    }
});

app.get("/users", (req, res) => {
    try {
        const token = req.headers.authorization;

        console.log(token);

        if (!token) res.json({ message: "token is missing" });

        jwt.verify(token, privateKey, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Invalid token" });
            } else {
                const data = await User.find();
                res.status(200).json(data);
            }
        });

        // // Token is valid, proceed with fetching users
        // User.find({}, (err, data) => {
        //     if (err) {
        //         console.log(err);
        //         res.status(500).json({ error: "Internal Server Error" });
        //     } else {
        //         console.log("All users sent as JSON");
        //         res.status(200).json(data);
        //     }
        // });
    } catch (err) {
        console.log(err);
        res.status(501).json({
            error: "couldn't fetch data",
        });
    }
});

app.listen(port, () => {
    console.log(`Your server is running at  ${port}`);
});

//fetch vs axios, Zod

fetch("https://fakerapi.it/api/v1/addresses?_quantity=1")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
