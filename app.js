// all requires and declarations
const express = require("express"), app = express(); // creating express server
const path = require('path');
const request = require("request");
const bodyParser = require("body-parser");  // used bodyparser to get data from all the field in form
const CFNfile = require('./launch_cloudformation');


// Declaration related to servers
const PORT = process.env.PORT || 8080;

//Main body of the js file
app.use(bodyParser.urlencoded({  // this is important
    extended: true
}));

app.use(bodyParser.json());  // this is important caused a lot of time waste.

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'vendors')));
app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/index', function (req, res) {
    res.render('index');
});


app.get('/coming', function (req, res) {
    res.render('coming');
});

app.get('/custom', function (req, res) {
    res.render('custom');
});


request('http://169.254.169.254/latest/meta-data/public-ipv4', function (error, response, body) {
    if (body !== undefined) console.log('server started on ip:port : http://' + body + ":" + PORT);
    else console.log('server started on ip:port : ' + 'http://localhost' + ":" + PORT);
});

app.listen(PORT, function (err) {
    if (err) console.log("There was some problem in starting the server  : " + JSON.stringify(err, undefined, 2));
    else console.log('server started on port : ' + PORT);
});

console.log('Server-side code running');

app.get('/launchstack', function (req, res) {
    res.render("launchstack");
});

app.post('/launchstack', function (req, res) {
    console.log(req.body.stackName);
    CFNfile.createSTK(req.body.stackName);
});

app.get('/tableshow', function (req, res) {

    CFNfile.getStackOutputs(function (data) {
        // console.log(data);
        // res.end(JSON.stringify(data));
        res.render("tableshow", {outdata});
        // data.forEach(function(element,index) {
        //       // console.log("element " + index + element);
        //       console.log("data is : " + element['OutputKey'] + " val : "  + element ['OutputValue']);
        // });
    });

});
