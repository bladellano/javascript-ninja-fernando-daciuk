'use strict'

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

var users = [{
    username:'joao',
    name:'João',
    age:30
},
{
    username:'maria',
    name:'Maria',
    age:22
}];

app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.get('/',function(req,res){
    res.json({response:'Home'});
});

app.get('/user',function(req,res){
    res.json({response:'User'});
});

app.get('/user/:username',function(req,res){

    var username = req.params.username;
    var hasUser = users.some(function(user){
        return user.username === username;
    });

    if(hasUser){
        return res.json(users.filter(function(user){
            return user.username === username;
        })[0]);
    }
    res.status(404).json({error:'Usuário não encontrado.'});
}); 

app.post('/user',function(req,res){
    var username = req.body.username;
    var age = req.body.age;
    var name = req.body.name;

    var hasUser = users.some(function(user){
        return user.username === username;
    });

    if(!hasUser){
       users.push({        
        username:username,
        name:name,
        age:age    
    });
   }  
   
   res.json(users); 
});

app.listen(3000);;


