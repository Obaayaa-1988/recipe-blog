const WebyModel = require('../model/weby');
const express = require('express');
const multer = require('multer');

const saveContact = (req,res) =>{
    const data = {
        recipy: req.body.recipy,
        chef: req.body.chef,
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

const saveIndex = (req, res) =>{
    WebyModel.find().then(results => {
        if(results){
            //res.send(results)
            res.render("index", {field: results})
        }
    })

}


const saveAbout = (req, res) =>{
    WebyModel.findById(req.params.id).then(result => {
        if(result){
            res.render("about", {pass: result})
        }
    }).catch(err => console.log(err))
}




module.exports ={
    saveContact,
    saveIndex,
    saveAbout

}
