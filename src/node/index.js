var express=require("express");
var app=express();
app.use(express.static('aa'));
app.all("*",function(req,res,next){
	res.header("Access-Control-Allow-Origin","*");
	next();
})
app.get("/",function(req,res){
	res.sendFile(__dirname+"/1.json");
});
app.get("/o",function(req,res){
	res.sendFile(__dirname+"/11.json");
});
app.get("/p",function(req,res){
	res.sendFile(__dirname+"/2.json");
});
app.get("/z",function(req,res){
	res.sendFile(__dirname+"/22.json");
});
app.get("/f",function(req,res){
	res.sendFile(__dirname+"/3.json");
});
app.get("/y",function(req,res){
	res.sendFile(__dirname+"/33.json");
});
app.get("/w",function(req,res){
	res.sendFile(__dirname+"/5.json");
});
var server=app.listen("3000",function(){
	console.log("服务已启动");
});
