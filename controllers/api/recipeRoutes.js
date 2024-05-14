const router= require('express').Router();
const { Recipe} = require('../models');
const withAuth=require('../../utils/auth')

//     /api/recipes/create-recipes
router.post ('/create-Recipes', async (req,res)=>{
    try{
        const{name, directions, description, picture}=req.body

        const newRecipe= await Recipe.create({
            name,
            directions,
            description,
            picture,
            user_id: req.session.user_id,
            ingredients


        });
        return res.status(200)(newRecipe);

    }catch(err){
        return res.status(500).json({Message:'Failed to create a recipe', error:err.message});

    }
})
