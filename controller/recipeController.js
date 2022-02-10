const WebyModel = require('../model/weby');
const SignModel = require('../model/signUp');
const express = require('express');
const multer = require('multer');


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
const saveSignUp = async(req, res) =>{
    const {username, email, password } = req.body;

  try {
    const newUser = new SignModel({
      username,
      email,
      password
    });

    const user = await newUser.save();
    if (user) {
      res.send(user)
      //   res.status(201).json({ message: "registering successful" });
    }
  } catch (error) {
    console.log(error);
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
    saveSignUp
    

}
