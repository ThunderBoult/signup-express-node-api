
const express= require("express");

const bodyparser= require("body-parser");

const request= require("request");

const https= require("https");

const app= express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(request, response){

  response.sendFile(__dirname + "/signup.html");
});

app.post("/", function(request, response){

  const firstName= request.body.fname;
  const lastName= request.body.lname;
  const email= request.body.email;

  const data= {

    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }

    ]
  };

  const jsonData= JSON.stringify(data);

  const url="https://us6.api.mailchimp.com/3.0/lists/36470f20ff";

  const option={

    method: "POST",
    auth: "thunderboult:8035ae3b9a0316d62e9152966d3478cd-us6"
  }


const req= https.request(url, option, function(res){

  if(res.statusCode === 200){
    response.sendFile(__dirname + "/success.html");
  }else{
    response.sendFile(__dirname + "/failure.html");
  }


    res.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  // req.write(jsonData);
  req.end();
});

app.post("/failure", function(req, res){

  res.redirect("/");
});

app.listen(3000, function(){

  console.log("server started");
});

// API key
// 8035ae3b9a0316d62e9152966d3478cd-us6
// Audience key
// 36470f20ff
