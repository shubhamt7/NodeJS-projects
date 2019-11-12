var express=require("express");
var app= express();
var bodyParser= require("body-parser");
var mongoose= require("mongoose");
var expressSanitizer= require("express-sanitizer");
var methodOverride= require("method-override");
var passportLocalMongoose= require("passport-local-mongoose");
var Blog= require('./models/blog');
var Comment= require("./models/comment");
var User= require("./models/user");
var seedDB= require('./seeds');
var passport=require("passport")
var LocalStrategy= require("passport-local").Strategy;
var commentRoutes= require('./routes/comments');
var blogRoutes=require('./routes/blogs');
var indexRoutes=require('./routes/index.js');

mongoose.connect("mongodb://localhost:27017/BlogsDB",{useNewUrlParser:true});
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// seedDB();




//passport config
app.use(require("express-session")({
    secret:"My secret",
    resave:"False",
    saveUninitialized:"False"
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
})

app.use(indexRoutes);
app.use(blogRoutes);
app.use(commentRoutes);


app.listen(3000,process.env.IP,function(){
    console.log("Blogs db connected successfully");
})







