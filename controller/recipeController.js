const WebyModel = require('../model/weby');
const express = require('express');
const multer = require('multer');

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






/*
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
    fetchVegetarian
    

}
