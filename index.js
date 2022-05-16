const express = require("express");

const app = express();


app.use(express.static("public"));

const path = require("path");

app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname,"public","index.html"))
})


const PORT = process.env.PORT || 8080;
app.listen(PORT);