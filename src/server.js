const fetch = require('node-fetch');
const express = require('express');
const app = express();
var mongoose = require('mongoose');
var bcrypt=require('bcrypt');
const { trustedTypes } = require('trusted-types');
const { number, string } = require('yargs');
let serverURL = "mongodb+srv://stu112:p814727-@csci2720.m2qbq.mongodb.net/stu112";
mongoose.connect(serverURL);
// Use the cors middleware for Express to enable submission from local HTML forms.
const cors = require('cors');
app.use(cors());
// This module is for parsing the content in a request body (installed with npm)
const bodyParser = require('body-parser');
const { reject } = require('q');
// Use parser to obtain the content in the body of a request
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
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
    latitude: {type: Number, required: true},
    longtitude: {type: Number, required: true}
});
const LocationTimeSchema = mongoose.Schema({
    location_id: {type: Number, required: true},
    date_time: {type: Date, required: true},
    temp: {type: Number},
    relative_humidity: {type: Number},
    wind_dir: {type: String},
    wind_speed: {type: Number},
    wind_gust: {type: Number}
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
app.post('/userlogin', (req, res) => {
    let login_name = req.body['username'];
    let login_password = req.body['password'];
    findUser = User.findOne({user_name: login_name});
    findUser.exec((err, e) => {
        if (err) {
            res.send(err);
        }
        else if (e == null)
        {
            console.log('This user doesn not exist!');
            res.send('error');
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
app.post('/newuser', (req, res) => {
    let my_user_name = req.body['username'];
    let my_password = req.body['password'];
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
    let my_id = 20;
    let my_name = "Wong Chuk Hang";
    let my_latitude = 22.24777778;
    let my_longtitude = 114.1736111;
    Location.create({
        location_id: my_id,
        location_name: my_name,
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

app.get('/deletelocation', (req, res) =>{
    let delete_name = 'Tsing Yi';
    let delete_id;
    find_loc = Location.findOne({location_name: delete_name});
    find_loc.exec((err, e) => {
        if (err)
            res.send(err);
        else
        {
            delete_id = e.location_id;
            find_loc = Location.findOne({location_name: delete_name});
            find_loc.deleteMany((err, e) => {
                if (err)
                    res.send(err);
                else
                {
                    UserLocation.find({location_id: delete_id}).deleteMany((err, e) => {
                        if (err)
                            res.send(err);
                        else
                        {
                            LocationComment.find({location_id: delete_id}).deleteMany((err, e) => {
                                if (err)
                                    res.send(err);
                                else
                                {
                                    LocationTime.find({location_id: delete_id}).deleteMany((err, e) => {
                                        if (err)
                                            res.send(err);
                                        else
                                            res.send('Location Remove Success!');
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

app.get('/updateweather', (req, res) => {
    //const response = await fetch("https://api.data.gov.hk/v1/historical-archive/get-file?url=https%3A%2F%2Fdata.weather.gov.hk%2FweatherAPI%2Fhko_data%2Fregional-weather%2Flatest_1min_temperature.csv&time=20220510-0000");
    
    let new_date = new Date();
    let date = '' + new_date.getFullYear() + (new_date.getMonth() > 8? new_date.getMonth() + 1:('0'+(new_date.getMonth()+1))) + (new_date.getDate()>9?new_date.getDate():'0'+new_date.getDate());
    let time = '' + (new_date.getHours() > 9? new_date.getHours(): '0' + new_date.getHours()) + (new_date.getMinutes() > 9? new_date.getMinutes(): '0' + new_date.getMinutes());
    
    const Promise1 = new Promise((resolve, reject) => {
        const response1 = fetch("https://api.data.gov.hk/v1/historical-archive/get-file?url=https%3A%2F%2Fdata.weather.gov.hk%2FweatherAPI%2Fhko_data%2Fregional-weather%2Flatest_1min_temperature.csv&time=" + date + "-" + time);
        var data = response1;
        data.then(e => e.text().then(data => {
            console.log(data);
            data = data.split('\n');
            if (data[0] == '{')
            {
                res.send("Error!");
                return;
            }
            for (i = 0; i < data.length; i++)
            {
                const PromiseN = new Promise((resolve, reject) => {record = data[i].split(',');resolve(record);}).then(record => {
                search_location = Location.findOne({location_name: record[1]});
                search_location.exec((err, e) => {                    
                    loc_id = (isNaN(e)?e.location_id:-1);
                    console.log(loc_id+'    ' + record[2]);
                    LocationTime.findOneAndUpdate({location_id: loc_id}, 
                        {
                            temp: Number(record[2])
                        }, (err, e) => {if (e) console.log(e)});
                })});
            }
            resolve();
            reject();
        }));
    });
    /*data.text().then(data => {
        res.send(data);
        data = data.split('\n');
        for (i = 0; i < data.length; i++)
        {
            data[i] = data[i].split(',');
            console.log(data[i]);
        }
    });*/
    const Promise2 = Promise1.then( resolve => {
        const response2 = fetch("https://api.data.gov.hk/v1/historical-archive/get-file?url=https%3A%2F%2Fdata.weather.gov.hk%2FweatherAPI%2Fhko_data%2Fregional-weather%2Flatest_10min_wind.csv&time=" + date + "-" + time);
        data = response2;
        data.then(e => e.text().then(data => {
            data = data.split('\n');
            for (i = 0; i < data.length; i++)
            {
                data[i] = data[i].split(',');
                console.log(data[i]);
            }
            return new Promise((resolve, reject) => {resolve()});
        }));
    });

    const Promise3 = Promise2.then( resolve => {
        const response3 = fetch("https://api.data.gov.hk/v1/historical-archive/get-file?url=https%3A%2F%2Fdata.weather.gov.hk%2FweatherAPI%2Fhko_data%2Fregional-weather%2Flatest_1min_humidity.csv&time=" + date + "-" + time);
        data = response3;
        data.then(e => e.text().then(data => {
            data = data.split('\n');
            for (i = 0; i < data.length; i++)
            {
                data[i] = data[i].split(',');
                console.log(data[i]);
            }
            return new Promise((resolve, reject) => {resolve()});
        }))
    });
    Promise3.then(resolve => res.send("Update Successful!"));
}); 

app.get('/delall', (req, res) => {
    Location.find({}).deleteMany((err, e) => res.send(e));
});
//update data: here https://api.data.gov.hk/v1/historical-archive/get-file?url=https%3A%2F%2Fdata.weather.gov.hk%2FweatherAPI%2Fhko_data%2Fregional-weather%2Flatest_1min_humidity.csv&time=20220507-0000

const server = app.listen(3000);