import express from "express";
import axios from "axios";
import bodyParser from "body-parser"; 
import _ from "lodash";

const app = express();
const port = 2000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const homePageBlogPost = `
    Welcome to my blog! This is where I share my thoughts, stories, and updates. 
    Dive into the latest posts and join the conversation!
`;
const aboutMePageContent = `
    Hi there! I'm a passionate writer and a lover of all things creative. 
    Through this blog, I hope to connect with like-minded individuals and share a bit of my world with you.
`;
const contactMePageContent = `
    Got questions or just want to say hi? Feel free to reach out to me! 
    You can contact me via email at example@example.com or through the form on this page.
`;

const posts = [];

app.get("/", (req, res) => {
    res.render("home.ejs", {posts});
});
app.get("/about", (req, res) => {
    res.render("about.ejs", {content: aboutMePageContent});
});
app.get("/contact", (req, res) => {
    res.render("contact.ejs", {content: contactMePageContent});
});
app.get("/compose", (req, res) => {
    res.render("compose.ejs", {});
});
app.post("/compose", (req, res) => {
    let post = {
        title: req.body.title,
        content: req.body.content
    }
    posts.push(post);
    res.redirect('/');
});
app.get("/posts/:postTitle", (req, res) => {
    posts.forEach(post => {
        if (_.lowerCase(post.title) === _.lowerCase(req.params.postTitle)) {
            res.render("post.ejs", {post});
        } else {
            res.status(404).redirect("/");
        }
    });
});

app.set("view engine", "ejs");

app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});