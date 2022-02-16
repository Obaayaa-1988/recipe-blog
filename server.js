const express = require('express');

const dotenv = require('dotenv').config();

const mongoose = require('mongoose')

const morgan = require('morgan')

const path = require('path')

const WebyModel = require('./model/weby')
const ReviewModel = require('./model/review')
const SignModel = require('./model/signUp');

const blogRoutes = require('./route/recipeRoute')

require('dotenv').config();

const multer = require('multer');

const cookiePasrser = require("cookie-parser");

const bcrypt = require('bcrypt');


const PORT = process.env.PORT || 9595;

const mongoUrl = process.env.mongoUl


const app = express();
//if you want to access it the env
//const string = process.env.MONGO_URI
app.use(cookiePasrser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(blogRoutes);


mongoose.connect(mongoUrl, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then(result => {
    if(result)
    console.log('connection to mongodb database connected')
}).catch(err => {
   console.log(err) 
})


app.use(express.static('public'));

app.set('view engine', 'ejs');

//routes for our pages

app.get("/", (req,res) => {
  res.render('index', {title: 'Home'})
  })

app.get("/about", (req,res) => {
    res.render('about', {title: 'About'})
})

app.get("/contact", (req,res) => {
    res.render('contact', {title: 'Contact'})
})
app.get("/explore", (req,res) => {
    res.render('explore', {title: 'Explore'})
})


app.get("/log", (req,res) => {
    res.render('log', {title: 'Log'})
})

app.get("/sign", (req,res) => {
    res.render('sign', {title: 'Sign'})
})

app.use((req, res) => {
    res.status(404).render('404', {title : "404"})
})

//post create and save data into the database request








app.listen(PORT, () => console.log(`listening on my server on ${PORT}`));



