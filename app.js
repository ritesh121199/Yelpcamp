var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");
var passport=require("passport");
var localstrategy=require("passport-local");
var methodoverride=require("method-override");
var flash=require("connect-flash");
user=require("./models/user");
campground=require("./models/campground");
comment=require("./models/comment");
seedDB=require("./seeds");
mongoose.connect("mongodb+srv://ritesh_121:yelpcamphost@cluster0.s8dc1.mongodb.net/yelpcamph?retryWrites=true&w=majority");

var commentroutes=require("./routes/comments");
var campgroundroutes=require("./routes/campgrounds");
var authroutes=require("./routes/index");

//seedDB();

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodoverride("_method"));
app.use(flash());

app.use(require("express-session")(
{
	secret:"once again we are goint to make yelpcamp",
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});

app.use(commentroutes);
app.use(campgroundroutes);
app.use(authroutes);

app.listen(3002,function(req,res)
{
	console.log("started");
});