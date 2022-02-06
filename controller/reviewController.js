const ReviewModel = require('../model/review');
const WebyModel = require('../model/weby');
const express = require('express');
const multer = require('multer');


//saving revies
const saveReview = (req,res) =>{
    const id =req.params.snaps
    console.log(id)

    const saveComment = new ReviewModel(req.body)
    saveComment.save().then(results => {
        if(results)
        res.redirect(`/about/${id}`)
    })

    console.log(saveComment)
}

//fetching comments

const fetchReviews = (req,res) =>{
    WebyModel.findById(req.params.id).then(result => {
        if(result){
            console.log(result.id)
             ReviewModel.find({'recipe_id': result.id}).then(doc => {
                 console.log(doc)
                 res.render('about',{backs:result, text:doc})
             })
        }
        
    })

}









/*
const saveReview = (req,res) =>{
    const data = {
        username: req.body.username,
        comment: req.body.comment 

    }

    const saveData = new ReviewModel(data);
        saveData.save().then(results => {
            if(results) res.redirect("/about")
        }).catch(err => {
            console.log(err);
        }) 
}

const fetchReviews = (req, res) =>{
    ReviewModel.find().then(results => {
        if(results){
            //res.send(results)
            res.render("about", {feed: results})
        }
    })

}*/






module.exports ={
    saveReview,
    fetchReviews
    
    

}