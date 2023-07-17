const express = require("express");
const { connection } = require("./config/db");
const app = express();
require("dotenv").config();

app.get("/",(req,res)=>{
    res.send("HOMEPAGE")
})

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to Database")
        console.log("Connection Establish")
    } catch (error) {
        console.log("Error while making connection to Server and Database")
    }
})