var express= require('express');
var router= express.Router();
var Blog= require('../models/blog');
var Comment=require('../models/comment');
var User= require('../models/user');

router.get("/blogs/:id/comments/new",isLoggedIn,function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{blog:foundBlog});
        }
    })
})

router.post("/blogs/:id/comments",isLoggedIn,function(req,res){
    //find blog using id
    //create a new comment
    //connecting comment to the blog
    //redirecting back to blog show page
    Blog.findById(req.params.id,function(err,blog){
        if(err){
            res.redirect("/blogs");
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id= req.user._id;
                    comment.author.username= req.user.username;
                    comment.save();
                    blog.comments.push(comment);
                    blog.save();
                    res.redirect('/blogs/' + blog._id);
                }
            })
        }
    })
});
router.get("/blogs/:id/comments/:comment_id/edit",checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit",{blog_id:req.params.id, comment:foundComment});
        }
    })
})
router.put("/blogs/:id/comments/:comment_id",checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/blogs/"+ req.params.id);
        }
    })
})
router.delete("/blogs/:id/comments/:comment_id",checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.res("back");
        }else{
            res.redirect("/blogs/"+req.params.id);
        }
    })
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCommentOwnership(req,res,next){
    if(req.isAuthenticated()){     //check whether user is logged in or not
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        })
    }
}

module.exports= router;