//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose= require("mongoose");

const homeStartingContent = "Welcome to our blog! Here, you will find a platform to share your thoughts, ideas, and experiences on a wide range of topics. We believe that everyone has something valuable to contribute, and we want to create a space where people can come together to share their interests and passions. Whether you're an expert in a particular field or just have something interesting to say, we encourage you to post and share your thoughts with our community. So, come along, join the conversation, and let's learn and grow together!";
const aboutContent = "Hello everyone! This is my Random Blog, a place where you can share anything that interests you. We believe that everyone has something unique to contribute, and we want to create a space where people can come together to share their ideas, thoughts, and experiences. Here, you can post about anything that you're passionate about, from hobbies and interests to current events and more. We welcome all perspectives and encourage open and respectful discussion. So, come on in, make yourself at home, and let's share our thoughts and interests together. Our community is a safe place for individuals to express themselves and explore new ideas. Here, you can share your personal stories, pictures, videos, and more, and connect with others who have similar interests.";
const contactContent = "Hola Peeps! We are happy to have you here. If you have any questions or queries regarding my blog or the content that we post, please do not hesitate to reach out to me. I would be more than happy to help you. You can contact me via   email: infinixop702@gmail.com   , I am always available to help you and to make sure that you are getting the most out of your experience on my blog. So, don't be shy, feel free to reach out to me, and let's connect!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://admin-vedant:Vedantsyk9@cluster0.pjgeag2.mongodb.net/blogDB",{useNewUrlParser: true});

const postSchema= mongoose.Schema({
      title:String,
      content:String
});

const Post=mongoose.model("Post",postSchema); 
let posts = [];

app.get("/", function(req, res){
  Post.find({},function(err,foundpost){
     if(!err){
      res.render("home",{startingContent:homeStartingContent, posts: foundpost})
     }
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post =new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
  
});

app.get("/posts/:postId", function(req, res){
  const requestedId =req.params.postId;
  Post.findOne({_id:requestedId},function(err,foundpost){
    if(!err){
      res.render("post",{title:foundpost.title, content:foundpost.content});
    }
  })

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
