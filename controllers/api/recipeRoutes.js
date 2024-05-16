const router= require('express').Router();
const { Recipe} = require('../../models');
const withAuth=require('../../utils/auth');
const multer = require('multer');  
const upload = multer();
const request = require('request');


//     /api/recipes/create-recipes
router.post ('/create-recipes', async (req,res)=>{
    try{
        const{name, directions, description, picture,ingredients}=req.body

        const newRecipe= await Recipe.create({
            name,
            directions,
            description,
            picture,
            user_id: req.session.user_id,
            ingredients

        });
       
   
        return res.status(200).json(newRecipe);

    }catch(err){
        return res.status(500).json({Message:'Internal Server Error', error:err.message});

    }
})

router.post('/upload/', upload.single('image'), (req, res) => {
    const url = `https://api.imgbb.com/1/upload?key=123b3628999f3acd81d822ab7e51db47`;
    const formData = {
        image: req.file.buffer.toString('base64')
    }  

    request.post({url, formData}, (err, response, body) => {
        if (err) {
            return res.status(500).json({message: 'Internal Server Error', error: err.message});
        }
        return res.status(200).json(body);
    });
});

module.exports=router;