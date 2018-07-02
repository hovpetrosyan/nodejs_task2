const express = require('express');
const moment = require('moment');
const bodyParser = require('body-parser');
const app = express();
let users = [];
let users_api = [];
//middlewares
app.set('view engine','pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/',function(req,res){
	res.send('Hello World');
});
app.get('/home',function(req,res){
	res.render('form.pug',{title:'wow'});
});
app.get('/results',function(req,res){
		res.render('results.pug',{users:users})
});
app.post('/form',function(req,res){
	users.push(req.body);
	console.log(users);
	res.redirect('/results');
});
app.get('/api/time',function(req,res){
	res.json({time:moment().format('LTS')});
});
app.post('/api/users',function(req,res){
	let o = {
		username: req.body.username, gender: req.body.gender, agree: req.body.agree, password: req.body.password
	};
	users_api.push(o);
	console.log(o);
	res.end();
});
app.get('/api/users',function(req,res){
	res.json(users_api);
});
app.listen(3000);