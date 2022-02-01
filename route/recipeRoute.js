const express = require('express')

const router = express.Router();

const recipeControl = require('../controller/recipeController')

const multer = require('multer');




router.get('/', recipeControl.saveIndex)

router.get('/about/:id', recipeControl.saveAbout)



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