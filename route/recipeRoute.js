const express = require('express')

const router = express.Router();

const recipeControl = require('../controller/recipeController')

const reviewControl = require('../controller/reviewController')


const multer = require('multer');



//post and get for the recipe
router.get('/', recipeControl.fetchIndex)

//router.get('/about-recipe/:id', recipeControl.fetchAbout)


//post and get for reviews
router.post('/comment/:snaps', reviewControl.saveReview)

router.get('/about/:id', reviewControl.fetchReviews)

//routes for categorie recipes only

router.get('/cate-lunch', recipeControl.fetchLunch)
router.get('/cate-vegetarian', recipeControl.fetchVegetarian)






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








module.exports = router