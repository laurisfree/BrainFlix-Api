const express = require("express");
const fs = require("fs");
const cors = require ("cors");
const { randomUUID } = require("crypto");
const app = express();
const {v4: uuid} = require('uuid')
// const{PORT, BACKEND_URL}= process.env


require('dotenv').config()

const {PORT, BACKEND_URL}= process.env
console.log(PORT)
console.log(BACKEND_URL)

app.use (cors ());

app.use(express.json())


app.get('/', (req, res) =>{
    console.log('test');
    res.send('welcome to my api');
});


app.get("/videos", function (req, res){
    
    fs.readFile("./data/videos.json", "utf-8", (err, data) => {
        if (err) {
            res.status (500).json (
                {message: "Not working", error: err}
            )} else {
                const videosData = JSON.parse(data) 
                .map(video=>{
                    return {
                        image: video.image,
                        title: video.title,
                        channel: video.channel,
                        id: video.id
                    }
                })
                res.json(videosData);
        }}
    );
});

app.post("/videos", function (req, res){
    const videosData = fs.readFileSync("./data/videos.json", "utf-8") 
    const parseData = JSON.parse(videosData)
    if (req.body?.title && req.body?.description) 
    {parseData.push ({
        id: uuid(),
        title: req.body.title,
        channel: "Fun channel",
        image: "https://i.imgur.com/5qyCZrD.jpg",
        description: req.body.description,
        views: "1,001,023",
        likes: "110,985",
        duration: "4:01",
        video: "https://project-2-api.herokuapp.com/stream",
        timestamp: Date.now(),
        comments: [],
    })
        fs.writeFileSync("./data/videos.json", JSON.stringify(parseData))
    }
    console.log(req.body)
    res.send("video added")
})


app.get("/videos/:id", function (req, res){
    const videosData = fs.readFileSync("./data/videos.json", "utf-8") 
    const parseVideoData = JSON.parse(videosData)
    res.json(parseVideoData.find(video => {
        return video.id === req.params.id
    }))
})



app.listen (5003, function() {
    console.log ("running at http://localhost:" + 5003);
});