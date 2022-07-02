const WebyModel = require('../model/weby');
const SignModel = require('../model/signUp');
const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt')
const token = require('jsonwebtoken');
const { handleErrors, generateToken } = require("../utility/sign.helper");
const { authUser, getUser } = require('../middleware/auth.user');





//saving recipe, ingredients records in the database
const saveContact = (req,res) =>{
    const data = {
        recipy: req.body.recipy,
        chef: req.body.chef,
        category:req.body.category,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        imageUpload: req.file.originalname

    }
    
    const storeData = new WebyModel(data);
        storeData.save().then(results => {
            if(results) res.redirect("/explore")
        }).catch(err => {
            console.log(err);
        }) 
}

//fetching data from the database
const fetchIndex = (req, res) =>{
    WebyModel.find().then(results => {
        if(results){
            //res.send(results)
            res.render("index", {field: results})
        }
    })

}

//fetching all recipes from the database 

const fetchAllRecipe= (req, res) =>{
    WebyModel.find().then(results => {
        if(results){
            //res.send(results)
            res.render("recipes", {allRecipe: results})
        }
    })

}





//fetching data for categories lunch only

const fetchLunch = (req, res) =>{
    WebyModel.find({'category': 'lunch'}).then(results => {
        if(results){
            //res.send(results)
            res.render("category", {dataCate: results})
        }
    })

}

//fetching data for category 
const fetchVegetarian = (req, res) =>{
    WebyModel.find({'category': 'vegetarian'}).then(results => {
        if(results){
            //res.send(results)
            res.render("category", {dataCate: results})
        }
    })

}

//get request for search

const saveSearch = (req, res) => {
    WebyModel.find().then(results => {
        
        if(Object.keys(req.query).length) {
            const renders =  results.filter(result => result.recipy.includes(req.query.search) || result.chef.includes(req.query.search))
            console.log(renders)
            if(renders.length) {
                res.render("search", { searchData: renders})
            }
            else {
                res.render("search", { searchData: results})
            }
        }
        
    })
}

//controller for signUp request
//post request for signup
const saveSignUp = async(req, res) =>{
    const {username, email, password } = req.body;

  try {
    const newUser = new SignModel({
      username,
      email,
      password
    });

    const user = await newUser.save();

    const token = generateToken(user._id);

    res.cookie("jwt", token, { maxAge: 3 * 24 * 60 * 60, httpOnly: true});
    
    res.status(201).json( { user: user._id });

} catch (error) {
        const errors = handleErrors(error);
        console.log(error.message)
        res.json( { errors });
    }
    
}


//login post request

const saveLogin = async (req, res) => {
    const { email, password} = req.body

    try {
        const user = await SignModel.findOne({email})
        console.log(user)

        if(user) {
            const isSame = await bcrypt.compare(password, user.password);
            console.log(isSame)
            if(isSame) {
                const token = generateToken(user._id);
                res.cookie('jwt', token, {maxAge: 3* 24 * 60 * 60, httpOnly: true});
                res.status(200).json({user: user._id})
            } else {
                res.json({errors: "Incorrect Password"})
            } 
        } else{
            res.json({errors: "Email doesn't exis please sign up"})

        }
        
    } catch (error) {
        const errors = handleErrors(error);
        
    }

}









/* get request for a sign recipe id
const fetchAbout = (req, res) =>{
    console.log(req.params.id)
    WebyModel.findById(req.params.id).then(result => {
        if(result){
            console.log(result)
            res.render("about", {pass: result})
          
        }
    }).catch(err => console.log(err))
}*/


module.exports ={
    saveContact,
    fetchIndex,
    fetchLunch,
    fetchVegetarian,
    saveSignUp,
    saveLogin,
    fetchAllRecipe,
    saveSearch
    

}
