//jshint esversion: 6

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var request = require('request');
var app = express();
app.use(express.static(__dirname+"/public"))
app.use(bodyParser.urlencoded({extended:true}));
const https = require('https');
app.get('/' , (req , res)=>{
    res.sendFile(__dirname + '/signup.html');
})

app.post('/' , (req , res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    console.log(firstName+' '+lastName+' '+email);
    //data operations
    const data = {
       members:   [
               {
                'email_address':email,
               
                status:'subscribed',
                'merge_fields':{
                    FNAME: firstName ,
                    LNAME: lastName,
                }   
               }
           ] , 
      
           
    }

    var jsonData = JSON.stringify(data);
    console.log(jsonData);   
    const url = 'https://us1.api.mailchimp.com/3.0/lists/09ce887af0';
    const options = {
        method:'POST',
        auth:'shubham:f3a0364a804d79294a9cd9cc2216a871-us1'
        
    }
   const request= https.request( url  ,options ,(response)=>{
      
      response.on('data' , (data)=>{
       
      })
      if (response.statusCode==200)
      res.sendFile( __dirname + '/success.html');
      else{
          res.sendFile(__dirname + '/failure.html')
      }
   });

   request.write(jsonData);
   request.end();
    
})

app.post( '/failure' , (req,res)=>{
    res.redirect('/');
} )

app.listen( process.env.PORT || 3000 , ()=>{ console.log('server started at port 3000')});


// 49732fc9c2407c68c3de5d7baf20762e-us1
// 09ce887af0
