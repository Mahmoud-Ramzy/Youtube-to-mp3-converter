//install all packages once
//npm i express dotenv ejs node-fetch@2
//required packages
const express=require("express");
const fetch= require("node-fetch");
require("dotenv").config();

//create express server
const app=express();

//first install body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set template engine
app.set("view engine","ejs");
app.use(express.static("project"));
//you can write js in ejs in html

app.get("/", (req,res)=>{
    res.render("index");
})
app.post("/convert-mp3",async (req,res)=>{
    const vidID= req.body.videoID;
    console.log(vidID);
    if(vidID===undefined || vidID===null|| vidID===''){
        return res.render('index',{success : false, message:"Please enter video ID"})
    }
    else{//to get api : https://rapidapi.com/
        
        const fetchAPI= await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${vidID}`, {
            "method": 'GET',
            "headers" : {
                "x-rapidapi-key": process.env.API_Key,
                "x-rapidapi-host": process.env.API_Host
            }});
            
        const Response= await fetchAPI.json();
        console.log(Response);
        
        if(Response.status==="ok"){
            let Linke=`https://www.youtube.com/embed/${vidID}`
            console.log(Linke);
            return res.render("index", { video_Link : Linke, success : true, song_title: Response.title, song_link: Response.link});
        }
        else
            return res.render("index", {success : false, message:Response.msg});
        
        }
})

//server port number
const port = process.env.port || 3000;


//Start server
app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
})
/*
function getData(req,res){
    res.send(projectData);
}
app.get('/weather',getData);
//post data method
function postData(req,res){
    projectData=req.body;
    console.log(projectData);
    res.send(projectData);
} */