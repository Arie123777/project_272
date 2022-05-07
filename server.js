const express = require('express');
const app = express();
var mongoose = require('mongoose');
var bcrypt=require('bcrypt');
const { trustedTypes } = require('trusted-types');
const { number, string } = require('yargs');
let serverURL = "mongodb+srv://stu112:p814727-@csci2720.m2qbq.mongodb.net/stu112";
mongoose.connect(serverURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//success
db.once('open', function() {
    console.log("Connection is open...");
    /* further actions which depends on db... */
});
// Defining Event and Location schema
const Schema = mongoose.Schema;
const UserSchema = mongoose.Schema({
    user_id: {type: Number, required: true, unique: true},
    user_name: {type: String, required: true},
    user_pwd: {type: String, required: true},
    user_rank: {type: Number, required: true}
});
const UserLocationSchema = mongoose.Schema({
    user_location_id: {type: Number, required: true, unique: true},
    user_id: {type: Number},
    location_id: {type: Number, required: true}
});
const LocationCommentSchema = mongoose.Schema({
    comment_id: {type: Number, required: true, unique: true},
    user_id: {type: Number, required: true},
    location_id: {type: Number, required: true},
    comment: {type: String}
});
const LocationSchema = mongoose.Schema({
    location_id: {type: Number, unique: true, required: true},
    location_name: {type: String, required: true},
    location_detail: {type: String},
    latitude: {type: Number, required: true},
    longtitude: {type: Number, required: true}
});
const LocationTimeSchema = mongoose.Schema({
    location_id: {type: Number, required: true},
    date_time: {type: Date, required: true},
    temp: {type: Number},
    relative_humidity: {type: Number},
    wind_dir: {type: String},
    wind_speed: {type: Number}
});

const User = mongoose.model('User', UserSchema);
const UserLocation = mongoose.model('UserLocation', UserLocationSchema);
const LocationComment = mongoose.model('LocationComment', LocationCommentSchema);
const Location = mongoose.model('Location', LocationSchema);
const LocationTime = mongoose.model('LocationTime', LocationTimeSchema);
// Use the cors middleware for Express to enable submission from local HTML forms.
app.get('/user', (req, res) => {
    User.find().exec((err,e)=>{
        if (err)
        res.send(err);
        else{
            console.log("hello1");
            res.json(e);
        }
    });
});

app.get('/userlocation', (req, res) => {
    UserLocation.find().exec((err,e)=>{
        if (err)
        res.send(err);
        else{
            console.log("hello2");
            res.json(e);
        }
    });
});

app.get('/locationcomment', (req, res) => {
    LocationComment.find().exec((err,e)=>{
        if (err)
        res.send(err);
        else{
            console.log("hello3");
            res.json(e);
        }
    });
});

app.get('/location', (req, res) => {
    Location.find().exec((err,e)=>{
        if (err)
        res.send(err);
        else{
            console.log("hello4");
            res.json(e);
        }
    });
});

app.get('/locationtime', (req, res) => {
    LocationTime.find().exec((err,e)=>{
        if (err)
        res.send(err);
        else{
            console.log("hello5");
            res.json(e);
        }
    });
});

// LOGIN: Please replace login_name and login_password according to the name defined in frontend
app.get('/userlogin', (req, res) => {
    let login_name = 'firstuser';
    let login_password = 'firstpassword';
    findUser = User.findOne({user_name: login_name});
    findUser.exec((err, e) => {
        if (err) {
            res.send(err);
        }
        else {
            bcrypt.compare(login_password, e.user_pwd ,function(err,success){
                if (err)
                    res.send(err);
                else
                {
                    if (success)
                    {
                        console.log('success');
                        res.send(e);
                    }
                    else
                    {
                        console.log('wrong password!');
                        res.send('error');
                    }
                }
             })
        }
    })
});

// Crud -> create
app.get('/newuser', (req, res) => {
    let my_user_name = 'firstuser';
    let my_password = 'firstpassword';
    let my_rank = 0;
    let max_id;
    let find_max_id = User.findOne({}).sort({user_id: -1});
    find_max_id.exec((err, e) => {
        if (err) {
            res.send(err);
        }
        else {
            if (e)
                max_id = e.user_id;
            max_id += 1;
            const salt_rounds = 10;
            const salt = bcrypt.genSaltSync(salt_rounds);
            User.create({
                user_id: max_id,
                user_name: my_user_name,
                user_pwd: bcrypt.hashSync(my_password, salt),
                user_rank: my_rank
            });
            res.send('User Generated!');
        }
    })
});

app.get('/newlocation', (req, res) => {
    let my_id = 1;
    let my_name = 'Tsing Yi';
    let my_detail = 'A Island';
    let my_latitude = 900;
    let my_longtitude = 900;
    Location.create({
        location_id: my_id,
        location_name: my_name,
        location_detail: my_detail,
        latitude: my_latitude,
        longtitude: my_longtitude
    });
    res.send('Location Saved!');
});

// cruD -> delete
app.get('/deleteuser', (req, res) => {
    let delete_name = 'firstuser';
    let delete_id;
    find_user = User.findOne({user_name: delete_name});
    find_user.exec((err, e) => {
        if (err)
            res.send(err);
        else
        {
            delete_id = e.user_id;
            console.log(delete_id);
            //delete
            find_user = User.findOne({user_name: delete_name});
            find_user.deleteMany((err, e) => {
                if (err)
                    res.send(err);
                else
                {
                    console.log("first layer!");
                    UserLocation.find({user_id: delete_id}).deleteMany((err, e) => {
                        if (err)
                            res.send(err);
                        else
                        {
                            console.log("second layer!");
                            LocationComment.find({user_id: delete_id}).deleteMany((err, e) => {
                                if (err)
                                    res.send(err);
                                else
                                    res.send('remove success!');
                            });
                        }
                    });
                }
            });
        }
    });
});


const cors = require('cors'); app.use(cors());

const server = app.listen(3000);