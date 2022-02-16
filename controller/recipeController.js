const WebyModel = require('../model/weby');
const SignModel = require('../model/signUp');
const express = require('express');
const multer = require('multer');
const token = require('jsonwebtoken');
const { handleErrors, generateToken } = require("../utility/sign.helper");



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
        res.json( { errors });
    }
    
}






//post request for login
const saveLogin = async (req,res) =>{
    const {username, email, password} = req.body;
    try{
        const user = await SignModel.findOne({ email });
        
        if (user) {
            const sameValue = await bcrypt.compare(password, user.password);
              if(sameValue)  {
                  const token  = generateToken(user._id);
                  res.cookie('jwt', token, {maxAge: 3* 24 * 60 * 60, httpOnly: true});

                  res.status(200).json({user: user.id})
              } else {
                  res.json({ errors: "Incorrect password"})
              }

        }
        

        if(username.value === "" || username.value === null){
            res.json({ errors: " fill your username"})

        }

    } catch (error) {
        const errors = handleErrors(error)
        console.log(errors)
        res.json(errors);
    }


};








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
    fetchAllRecipe
    

}
