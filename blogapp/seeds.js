var mongoose= require('mongoose');
var Blog= require('./models/blog');
var Comment= require('./models/comment');

var data= [
    {title: "Blog1" ,
    image: "https://neilpatel.com/wp-content/uploads/2017/08/blog.jpg",
    body: "This is my first blog"},
    {
    title:"Blog2",
    image:"https://www.impactbnd.com/hubfs/blog-image-uploads/9_Blog_Layout_Best_Practices_From_2017.jpg",
    body:"this is my second blog"
    }
    
]

function seedDB(){

    //Remove all blogs
    Blog.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed blogs");
         //add some blogs
    // data.forEach(function(blog){
    //     Blog.create(blog, function(err,addedBlog){
    //         if(err){
    //             console.log("error");
    //         }else{
    //             console.log("added a blog");
    //             Comment.create({
    //                 text:"This is demo comment",
    //                 author:"shubham"
    //             },function(err,comment){
    //                 if(err){
    //                     console.log(err);
    //                 }else{
    //                     addedBlog.comments.push(comment);
    //                     addedBlog.save();
    //                     console.log("added a comment");
    //                 }
    //             })
    //         }
    //     })
    // })
    })   
}

module.exports= seedDB;