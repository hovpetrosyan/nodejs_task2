const express = require('express');
const moment = require('moment');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
let users = [];
let users_api = [];
//middlewares
app.set('view engine','pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/',function(req,res){
	
	if( !req.cookies.time){
		
		res.cookie('time',moment().format('LTS'),{maxAge:60000});
	}
	res.send(req.cookies.time);
	console.log(req.cookies);
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
app.get('/myroute/:param',function(req,res){
	console.log(req.params.param);
	console.log(req.query.param);
	console.log(req.get('param'));
	console.log(req.cookies.param);
	res.send({param_param:req.params.param,query_param:req.query.param,header_param:req.get('param'),cookie_param:req.cookies.param});
});
app.listen(3000);