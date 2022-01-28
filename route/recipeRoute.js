const express = require('express')

const router = express.Router();

const recipeControl = require('../controller/recipeController')



router.post("/contact", recipeControl.saveContact )



router.get('/', recipeControl.saveIndex)






module.exports = router