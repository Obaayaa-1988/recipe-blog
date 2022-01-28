const WebyModel = require('../model/weby');
const express = require('express');

const saveContact = (req,res) =>{
    const data = {
        recipy: req.body.recipy,
        chef: req.body.chef,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions

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
            res.render("index", {field: results})
        }
    })

}


module.exports ={
    saveContact,
    saveIndex

}
