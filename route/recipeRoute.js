const express = require('express')

const router = express.Router();

const recipeControl = require('../controller/recipeController')
const { authUser, getUser } = require('../middleware/auth.user');
const reviewControl = require('../controller/reviewController')
const cookiePasrser = require("cookie-parser");
const bcrypt = require('bcrypt');
const multer = require('multer');


router.get('*', getUser);


//post and get for the recipe
router.get('/', recipeControl.fetchIndex)

//router.get('/about-recipe/:id', recipeControl.fetchAbout)


//post and get for reviews
router.post('/comment/:snaps', reviewControl.saveReview)

router.get('/about/:id', reviewControl.fetchReviews)

//routes for categorie recipes only

router.get('/cate-lunch', recipeControl.fetchLunch)
router.get('/cate-vegetarian', recipeControl.fetchVegetarian)

//fetching all recipes or categories
router.get('/all-recipy', authUser, recipeControl.fetchAllRecipe)



//serching for recipe, chef etc in the search input
router.get('/search', recipeControl.saveSearch)


//routes for signup and login

router.post('/sign-up', recipeControl.saveSignUp)
router.post('/log-in', recipeControl.saveLogin)
//getting all get request







//storing an image to the database

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,'public/uploads')
    },
    filename: function(req, file, cb){
        const uniqueSuffix = file.originalname
        cb(null, file.fieldname + uniqueSuffix)
        console.log(uniqueSuffix)
    },

})

const upload = multer({storage})

router.post("/contact",upload.single('imageUpload'), recipeControl.saveContact )








module.exports = router;