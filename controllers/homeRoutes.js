// TODO: Change or add any View routes here

const router = require('express').Router();
const { Recipe} = require('../models');
const withAuth = require('../utils/auth');
//Route to display all recipes
router.get('/', async (req, res) => {
    try {
        const dbRecipes = await Recipe.findAll({
            
        });
        
        const recipes = dbRecipes.map(recipe => recipe.get({ plain: true }));
        
        res.render('createRecipes', {
            recipes,
            // Pass the logged in flag to the template
            loggedIn: req.session.loggedIn,
        });
        return res.status(200).json(recipes)
    } catch (err) {
      console.error('Error finding ALL recipes:',err);
        return res.status(500).json({message:'Internal server error',error:err.message});
      
    }
});

// Prevent non logged in users from viewing the recipe page
//Route to display a single recipe
router.get('/recipe:id', withAuth, async (req, res) => {
    try {
    const dbRecipeData = await Recipe.findByPk(req.params.id,{
    });

    if(!dbRecipeData){
      return res.status(404).json({message:'Recipe not found'});
    }

    const recipe= dbRecipeData.get({plain:true});
    res.render('viewRecipes',{recipe,
      loggedIn: req.session.loggedIn,
    });
    return res.status(200).json(recipe)
  } catch (err) {
    console.error('Error finding that recipe:',err);
    return res.status(500).json({message:'Internal server error',error:err.message});
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the createRecipes
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/create-recipes',withAuth, async(req,res)=>{
  try{
    const dbCreateRecipeData= await Recipe.findAll({});
    const createRecipe=dbCreateRecipeData.map(recipe=> recipe.get({plain:true}));
    res.render('createRecipes', {
      createRecipe,
      
      loggedIn: req.session.loggedIn
  });

    return res.status(200).json(createRecipe)
  }catch(err){
    console.error('Error retrieving created recipe', err)
    return res.status(500).json({message:'Internal server error',error:err.message});
  }
});

router.get('/my-recipes',withAuth, async(req,res)=>{
  try{
    const dbMyRecipesData= await Recipe.findAll({where:{user_id:req.session.user_id}})
    const myRecipe=dbMyRecipesData.map((recipe)=>recipe.get({plain:true}));
    res.render('viewRecipes', {
      myRecipe,
      
      loggedIn: req.session.loggedIn
  });

  return res.status(200).json(myRecipe)
  }catch(err){
    console.error('Error retrieving my recipes', err)
    return res.status(500).json({message:'Internal server error',error:err.message});
    
  }
});




module.exports = router;
