const express = require('express');
const https = require('https');
const { Http2ServerRequest } = require('http2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req,res)=> {
   res.sendFile(__dirname + "/index.html");
})
app.post('/', (req,res)=> {
    const querry = req.body.Cityname
const apikey = '7964114acce92759e0c67258d9581bd5'
const url= 'https://api.openweathermap.org/data/2.5/weather?q=' + querry + '&appid=' + apikey +'&units=metric'
https.get(url, (response)=> {
   console.log(response.statusCode);
    response.on('data', (data)=> {
       console.log(data);
     const weatherdata = JSON.parse(data);
        console.log(weatherdata);
       const temp = weatherdata.main.temp;
       const description = weatherdata.weather[0].description
        console.log(description);
      res.write("<h1>The temperature in " + querry + " is " + temp + " degree celcius</h1>")
      res.write("<p>The weather condition is " + description + "</p>")
    })
})
})



app.listen(3000, ()=> console.log("Our server is running at port 3000"))
