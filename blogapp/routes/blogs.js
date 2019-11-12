var express= require('express');
var router= express.Router();
var Blog= require('../models/blog');
var Comment=require('../models/comment');

router.get("/blogs", function (req, res) {
    Blog.find({}).sort({createdAt: -1}).exec(function(err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("blogs/index", {blogs: blogs})
        }
    });
});

//index routes
router.get("/",function(req,res){
    res.redirect("/blogs");
})
//new route
router.get("/blogs/new",isLoggedIn,function(req,res){
    res.render("blogs/new");
})
//create route
router.post("/blogs",isLoggedIn,function(req,res){
    req.body.blog.body= req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,function(err, newBlog){
        if(err){
            res.render("new");
        }else{
            res.redirect("/blogs");
        }
    })
});
//show page route
router.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id).populate("comments").exec(function(err,foundBlog){
           if(err){
               res.redirect("/blogs");
           }else{
               res.render("blogs/show",{blog:foundBlog});
           }
    })
});
//edit route
router.get("/blogs/:id/edit",function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("blogs/edit",{blog:foundBlog});
        }
    })
})
//update route
router.put("/blogs/:id",function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
     Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,updatedBlog){
         if(err){
             res.redirect("/blogs");
         }else{
             res.redirect("/blogs/"+req.params.id);
         }
     })
});
//destroy route
router.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    })
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports= router;