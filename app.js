
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
          
});



    app.post("/",function(req,res){

        const cityName = req.body.cityName;
        const appId = "88f33248c31bb562f86c0eabd522f9be";

        const url ="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+appId+"&units=metric" ;
        https.get(url,function(response)
        {
            response.on("data",function(data)
            {
                const weatherData = JSON.parse(data);
                const temp = weatherData.main.temp;
                const description = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
                res.write("<h1>Temperature in "+cityName+" is "+temp+" degree Celsius.<h1>");
                res.write("Description : "+description);
                res.write("<img src="+imageUrl+" >");
                res.send();
   
});
});
});

app.listen(3000,function()
{
    console.log("Server started on port 3000.")
});




        