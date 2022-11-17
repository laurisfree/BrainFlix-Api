const express = require("express");
const fs = require("fs");
const cors = require ("cors");
const app = express();


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