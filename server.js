// require express
var express = require("express");
// path module
var path = require("path");
var mongoose = require('mongoose');
var session = require('express-session');
var moment = require('moment');
// create the express app
var app = express();
app.use(session({ secret: 'codingdojorocks' }));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static( __dirname + '/BikeMarketPlace/dist' ));


//DB stuff
mongoose.connect('mongodb://localhost/BikeMarketplace');
var Schema = mongoose.Schema

var UserSchema = new mongoose.Schema({
    locked: {
        type: Boolean,
    },
    fName: {
        type: String,
    },
    lName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: String,
    bikes: [{type: Schema.Types.ObjectId, ref: 'Bike'}]
}, { timestamps: true })

var BikeSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    price: {
        type: Number,
    },
    img_url: {
        type: String,
    },
    _user: {type: Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true })


mongoose.model('User', UserSchema);
mongoose.model('Bike', BikeSchema);

var User = mongoose.model('User');
var Bike = mongoose.model('Bike');
//end DB stuff

//routes
app.get('/getUsers', function (req, res) {
    console.log('getting users in server')
    User.find({},function(err, users) {
        if(err){
            console.log("e0rr0r",)
        }else{
            res.json({message:'The Users', users: users})
        }
    })
})
app.post('/contact', function (req, res) {
    console.log('getting user in server')
    User.find({_id: req.body.id},function(err, user) {
        if(err){
            console.log("e0rr0r",)
        }else{
            res.json({message:'The User', user: user})
        }
    })
})
app.get('/allBikes', function (req, res) {
    console.log('getting bikes in server')
    Bike.find({},function(err, bikes) {
        if(err){
            console.log("e0rr0r",)
        }else{
            console.log(bikes)
            res.json({message:'The Bikes', bikes: bikes})
        }
    })
})
app.post('/userBikes', function (req, res) {
    console.log('getting user bikes in server')
    Bike.find({_user: req.body._id},function(err, bikes) {
        if(err){
            console.log("e0rr0r",)
        }else{
            console.log(bikes)
            res.json({message:'The user Bikes', bikes: bikes})
        }
    })
})
app.post('/loginUser', function (req, res) {
    console.log('looking for user in DB')
    User.findOne({email:req.body.email},function(err, user) {
        console.log('email: ', req.body.email)
        console.log('password: ', req.body.password)
        if(user != null) {
            console.log('found user in server')
            if(user.password != req.body.password) {
                console.log("e0rr0r",)
                res.json({errorMsg:'Wrong password'})
            } else {
                res.json({message:'The Logged in one', loggedUser: user})
            }
        } else {
            res.json({errorMsg: 'dat user don\'t exists'})
        }
    })
})
// app.post('/updateUser', function (req, res) {
//     console.log('upating users in server')
//     user.update({_id: req.body.user_id}, {status: req.body.status}, function(err, user) {
//         if(err){
//             console.log("update error",)
//         }else{
//             res.json({message:`${user.name} updated`})
//         }
//     })
// })
app.post('/updateBike', function (req, res) {
    console.log('upating bike in server')
    Bike.update({_id: req.body._id}, {
        title: req.body.title,
        description: req.body.description,
        img_url: req.body.img_url,
        price: req.body.price,
        location: req.body.location,
    }, function(err, user) {
        if(err){
            console.log("update error",)
        }else{
            res.json({message:`bike updated`})
        }
    })
})
app.post('/deleteBike', function (req, res) {
    console.log('deleteing bike in server')
    Bike.remove({_id: req.body._id}, function(err, user) {
        if(err){
            console.log("deleteing error",)
        }else{
            res.json({message:`bike deleted`})
        }
    })
})
app.post('/addBike', function(req, res) {
    console.log('req.body.userID', req.body.userID)
    User.findOne({_id: req.body.userID}, function(err, user) {
        console.log("creating new bike in server", req.body)
        newBike = new Bike()
        newBike.title = req.body.title
        newBike.description = req.body.description
        newBike.location = req.body.location
        newBike.price = req.body.price
        newBike.img_url = req.body.imgUrl
        newBike._user = req.body.userID
        console.log('newBike', newBike)
        newBike.save(function(err) {
            user.bikes.push(newBike);
            user.save(function(err) {
                if(err){
                    console.log('saving user bike error')
                    res.json({err})
                }else{
                    res.json({message:`${newBike.title} bike added`})
                    console.log('user added');
                }
            })
        })
    })
})
app.post('/registerUser', function(req, res) {
    User.find({email: req.body.email}, function(err, user) {
        console.log('in server')
        if(user.length == 0) {            
            console.log("creating new User in server")
            newUser = new User()
            newUser.locked = false
            newUser.fName = req.body.fName
            newUser.lName = req.body.lName
            newUser.email = req.body.email
            newUser.password = req.body.password
            console.log(user)
            newUser.save(function(err) {
                if(err){
                    console.log('new user error')
                    res.json({err})
                }else{
                    res.json({message:`with ${newUser.fName} added`})
                    console.log('user added');
                }
            })
        } else {
            res.json({error: 'that email already exists in our DBs'});
        }
    })
})
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./BikeMarketPlace/dist/index.html"))
});
//end routes


// tell the express app to listen on port 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
});
