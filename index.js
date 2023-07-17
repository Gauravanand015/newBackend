const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { quizRouter } = require("./routes/quiz.route");
const app = express();
const cors = require("cors")
require("dotenv").config();
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("HOMEPAGE")
})

app.use("/",userRouter)
app.use("/quiz",quizRouter)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to Database")
        console.log("Connection Establish")
    } catch (error) {
        console.log("Error while making connection to Server and Database")
    }
})