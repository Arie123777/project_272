const fetch = require('node-fetch');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
var mongoose = require('mongoose');
var bcrypt=require('bcrypt');
const { trustedTypes } = require('trusted-types');
let serverURL = "mongodb+srv://stu112:p814727-@csci2720.m2qbq.mongodb.net/stu112";
mongoose.connect(serverURL);
// Use the cors middleware for Express to enable submission from local HTML forms.
const cors = require('cors');
app.use(cors());
// This module is for parsing the content in a request body (installed with npm)
const bodyParser = require('body-parser');
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
    user_name: {type: String, required: true, unique: true},
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
    location_name: {type: String, unique: true, required: true},
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

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// Use the cors middleware for Express to enable submission from local HTML forms.
app.get('/user', (req, res) => {
    User.find().exec((err,e)=>{
        if (err)
        {
            res.status(404);
            res.send(err);
        }
        else{
            res.status(200);
            res.json(e);
        }
    });
});

app.get('/userlocation', (req, res) => {
    UserLocation.find().exec((err,e)=>{
        if (err)
        {
            res.status(404);
            res.send(err);
        }
        else{
            res.status(200);
            res.json(e);
        }
    });
});

app.get('/locationcomment', (req, res) => {
    LocationComment.find().exec((err,e)=>{
        if (err)
        {
            res.status(404)
            res.send(err);
        }
        else{
            res.status(200);
            res.json(e);
        }
    });
});

app.get('/location', (req, res) => {
    Location.find().exec((err,e)=>{
        if (err)
        {
            res.status(404);
            res.send(err);
        }
        else{
            res.status(200);
            res.json(e);
        }
    });
});

app.get('/locationtime', (req, res) => {
    LocationTime.find().exec((err,e)=>{
        if (err)
        {
            res.status(404);
            res.send(err);
        }
        else{
            res.status(200);
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
            res.status(404);
            res.send(err);
        }
        else if (e == null)
        {
            console.log('This user doesn not exist!');
            res.status(404);
            res.send('error');
        }
        else {
            bcrypt.compare(login_password, e.user_pwd ,function(err,success){
                if (err)
                {
                    res.send(404);
                    res.send(err);
                }
                else
                {
                    if (success)
                    {
                        res.cookie('login', {id: e.user_id, name:e.user_name}, {maxAge: 1800000, domain:"localhost", httpOnly:false});
                        console.log('success');
                        res.status(200);
                        res.send(e);
                    }
                    else
                    {
                        console.log('wrong password!');
                        res.status(404);
                        res.send('error');
                    }
                }
             })
        }
    })
});

app.get('/logout', (req, res) => {
    if (req.cookies != null)
    {
        let user_name = req.cookies['login']['name'];
        res.clearCookie('login');
        res.send(user_name);
    }
    else
    {
        res.send('You are not logined yet!');
    }
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
            res.status(404);
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
            }, (err, e) => {
                if (err)
                {
                    res.status(400);
                    res.send('Username already exists!');
                }
                else
                {
                    res.status(200);
                    res.send('User Generated!');
                }
            });
        }
    })
});

app.post('/newlocation', (req, res) => {
    let my_id = Number(req.body['location_id']);
    let my_name = req.body['location_name'];
    let my_latitude = Number(req.body['latitude']);
    let my_longtitude = Number(req.body['longtitude']);
    Location.create({
        location_id: my_id,
        location_name: my_name,
        latitude: my_latitude,
        longtitude: my_longtitude
    }, (err, e) => {
        if (err)
        {
            res.status(400);
            res.send('This id/name already exists!')
        }
        else
        {
            let current_time = new Date();
            LocationTime.create({
                location_id: my_id,
                date_time: current_time,
                temp: -300,
                relative_humidity: -1,
                wind_dir: "Not Available",
                wind_speed: 0,
                wind_gust: 0
            })
            res.status(200);
            res.send('Location Saved!');
        }
    });
});

// cruD -> delete
app.delete('/deleteuser', (req, res) => {
    let delete_name = req.body['user_name'];
    let delete_id;
    find_user = User.findOne({user_name: delete_name});
    find_user.exec((err, e) => {
        if (err)
        {
            res.status(404);
            res.send(err);
        }
        else
        {
            if (e == null)
            {
                res.status(404);
                res.send("This user does not exist!");
                return;
            }
            else
            {
                delete_id = e.user_id;
                //delete
                find_user = User.findOne({user_name: delete_name});
                find_user.deleteMany((err, e) => {
                    if (err)
                    {
                        res.status(404);
                        res.send(err);
                    }
                    else
                    {
                        UserLocation.find({user_id: delete_id}).deleteMany((err, e) => {
                            if (err)
                            {
                                res.status(404);
                                res.send(err);
                            }
                            else
                            {
                                LocationComment.find({user_id: delete_id}).deleteMany((err, e) => {
                                    if (err)
                                    {
                                        res.status(404);
                                        res.send(err);
                                    }
                                    else
                                    {
                                        res.status(200);
                                        res.send('remove success!');
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });
});

app.delete('/deletelocation', (req, res) =>{
    let delete_name = req.body['location_name'];
    let delete_id;
    find_loc = Location.findOne({location_name: delete_name});
    find_loc.exec((err, e) => {
        if (err)
        {  
            res.status(404);
            res.send(err);
        }
        else
        {   if (e==null)
            {
                res.status(400);
                res.send("Location not exist");
                return;
            }
            else
            {
                delete_id = e.location_id;
                find_loc = Location.findOne({location_name: delete_name});
                find_loc.deleteMany((err, e) => {
                    if (err)
                    {
                        res.status(404);
                        res.send(err);
                    }
                    else
                    {
                        UserLocation.find({location_id: delete_id}).deleteMany((err, e) => {
                            if (err)
                            {
                                res.status(404);
                                res.send(err);
                            }
                            else
                            {
                                LocationComment.find({location_id: delete_id}).deleteMany((err, e) => {
                                    if (err)
                                    {
                                        res.status(404);
                                        res.send(err);
                                    }
                                    else
                                    {
                                        LocationTime.find({location_id: delete_id}).deleteMany((err, e) => {
                                            if (err)
                                            {
                                                res.status(404);
                                                res.send(err);
                                            }
                                            else
                                            {
                                                res.status(200);
                                                res.send('Location Remove Success!');
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });
});

app.get('/updateweather', (req, res) => {
    let new_date = new Date();
    let date = '' + new_date.getFullYear() + (new_date.getMonth() > 8? new_date.getMonth() + 1:('0'+(new_date.getMonth()+1))) + (new_date.getDate()>9?new_date.getDate():'0'+new_date.getDate());
    let time = '' + (new_date.getHours() > 9? new_date.getHours(): '0' + new_date.getHours()) + (new_date.getMinutes() > 9? new_date.getMinutes(): '0' + new_date.getMinutes());
    
    const Promise1 = new Promise((resolve, reject) => {
        const response1 = fetch("https://api.data.gov.hk/v1/historical-archive/get-file?url=https%3A%2F%2Fdata.weather.gov.hk%2FweatherAPI%2Fhko_data%2Fregional-weather%2Flatest_1min_temperature.csv&time=" + date + "-" + time);
        var data = response1;
        data.then(e => e.text().then(data => {
            data = data.split('\n');
            if (data[0] == '{')
            {
                res.status(500);
                res.send("Error!"); // If fetching success
                return;
            }
            for (i = 0; i < data.length; i++)
            {
                const PromiseN = new Promise((resolve, reject) => {record = data[i].split(',');resolve(record);}).then(record => {
                search_location = Location.findOne({location_name: record[1]});
                search_location.exec((err, e) => {                    
                    loc_id = (isNaN(e)?e.location_id:-1);
                    LocationTime.findOneAndUpdate({location_id: loc_id}, 
                        {
                            temp: Number(record[2])
                        }, (err, e) => {});
                })});
            }
            resolve();
            reject();
        }));
    });
    const Promise2 = Promise1.then( resolve => {
        const response2 = fetch("https://api.data.gov.hk/v1/historical-archive/get-file?url=https%3A%2F%2Fdata.weather.gov.hk%2FweatherAPI%2Fhko_data%2Fregional-weather%2Flatest_10min_wind.csv&time=" + date + "-" + time);
        data = response2;
        data.then(e => e.text().then(data => {
            data = data.split('\n');
            for (i = 0; i < data.length; i++)
            {
                const PromiseN = new Promise((resolve, reject) => {record = data[i].split(',');resolve(record);}).then(record => {
                    search_location = Location.findOne({location_name: record[1]});
                    search_location.exec((err, e) => {
                        loc_id = (isNaN(e)?e.location_id:-1);
                        LocationTime.findOneAndUpdate({location_id:loc_id},
                            {
                                wind_dir : record[2],
                                wind_speed : (record[3] == 'N/A'?0:Number(record[3])),
                                wind_gust : (record[4] == 'N/A'?0:Number(record[4]))
                            }, (err, e) => {});
                    });
                });
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
                const PromiseN = new Promise((resolve, reject) => {record = data[i].split(',');resolve(record);}).then(record => {
                    search_location = Location.findOne({location_name:record[1]});
                    search_location.exec((err, e) => {
                        loc_id = (isNaN(e)?e.location_id:-1);
                        LocationTime.findOneAndUpdate({location_id:loc_id},
                            {
                                date_time: new_date,
                                relative_humidity: (record[2] == 'N/A'?-1:Number(record[2]))
                            }, (err, e) => {});
                    });
                })
            }
            return new Promise((resolve, reject) => {resolve()});
        }))
    });
    res.status(200);
    Promise3.then(resolve => res.send("Update Successful!"));
}); 

app.post('/addcomment', (req, res) => {
    if (req.cookies == null)
    {
        res.status(400);
        res.send("You have not logined in!");
    }
    else
    {
        let max_id = 0;
        let find_max_id = LocationComment.findOne({}).sort({user_id: -1});
        find_max_id.exec((err, e) => {
            if (err)
            {
                res.status(404);
                res.send("Error!");
            }
            else
            {
                if (e)
                    max_id = e.comment_id;
                max_id += 1;
                let user_id = req.cookies['login']['id'];
                let my_content = req.body['content'];
                let my_location_name = req.body['location_name'];
                Location.findOne({location_name: my_location_name}).exec((err, e) => {
                    if (err || e == null)
                    {
                        res.status(404);
                        res.send("Error!");
                    }
                    else
                    {
                        let my_location_id = e.location_id;
                        LocationComment.create({
                            comment_id: max_id,
                            user_id: user_id,
                            location_id: my_location_id,
                            comment: my_content
                        });
                        res.status(200);
                        res.send("Add Comment Successful!");
                    }
                });
            }
        });
    }
});

app.post('/changepassword', (req, res) => {
    if (req.cookies == null)
    {
        res.status(404);
        res.send("You have not logined in yet!");
    }
    else
    {
        let user_id = req.cookies['login']['id'];
        let old_password = req.body['old_password'];
        let new_password = req.body['new_password'];
        User.findOne({user_id: user_id}).exec((err, e) => {
            if (err)
            {
                res.status(404);
                res.send("Error!");
            }
            else
            {
                bcrypt.compare(old_password, e.user_pwd ,function(err,success){
                    if (err)
                    {
                        res.send(400);
                        res.send("Error!");
                    }
                    else
                    {
                        if (success)
                        {
                            const salt_rounds = 10;
                            const salt = bcrypt.genSaltSync(salt_rounds);
                            User.findOneAndUpdate({user_id: user_id}, {
                                user_pwd: bcrypt.hashSync(new_password, salt)
                            }, (err, e) => {
                                if (err)
                                {
                                    res.status(404);
                                    res.send("Error!")
                                }
                                else
                                {
                                    res.status(200);
                                    res.send("Password changed successfully!");
                                }
                            });
                        }
                        else
                        {
                            console.log('Wrong password!');
                            res.status(404);
                            res.send('error');
                        }
                    }
                });
            }
        });
    }
});

app.get('/userfav', (req, res) => {
    if (req.cookies == null)
    {
        res.status(400);
        res.send("You have not logined in!");
    }
    else
    {
        let user_id = req.cookies['login']['id'];
        UserLocation.find({user_id: user_id}).sort({location_id: 1}).select({location_id: 1}).exec((err, e) => {
            if (err)
            {
                res.status(404);
                res.send("Error!")
            }
            else
            {
                res.status(200);
                res.send(e);
            }
        });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));