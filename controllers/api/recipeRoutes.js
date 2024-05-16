const router= require('express').Router();
const { Recipe} = require('../../models');
const withAuth=require('../../utils/auth');


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

module.exports=router;