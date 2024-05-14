// TODO: Change or add any View routes here

const router = require('express').Router();
const { Recipe} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const recipesData = await Recipe.findAll({
            order: [['name', 'ASC']],
        });
        
        const recipes = recipesData.map((recipe) => recipe.get({ plain: true }));
        
        res.render('createRecipes', {
            users,
            // Pass the logged in flag to the template
            loggedIn: req.session.loggedIn,
        });
        return res.status(200).json(recipes)
    } catch (err) {
        return res.status(500).json({message:'Internal server: Could not find all recipes',error:err.message});
      
    }
});

// Prevent non logged in users from viewing the recipe page
router.get('/recipe:id', withAuth, async (req, res) => {
    try {
    const recipeData = await Recipe.findByPk(req.params.id,{

    });

    const recipe= recipeData.get({plain:true});
    res.render('viewRecipes',{recipe,
      loggedIn: req.session.loggedIn,
    })
    return res.status(200).json(recipe)
  } catch (err) {
    return res.status(500).json({message:'Internal server: Could not find that recipe',error:err.message});
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
    const createRecipeData= await Recipe.findAll({})
    const createRecipe=createRecipeData.map((recipe)=>recipe.get({plain:true}));
    res.render('createRecipes', {
      createRecipe,
      
      loggedIn: req.session.loggedIn
  });

    return res.status(200).json(createRecipe)
  }catch(err){
    return res.status(500).json({message:'Internal server: Could not find that recipe',error:err.message});
  }
});

router.get('/my-recipes',withAuth, async(req,res)=>{
  try{
    const myRecipesData= await Recipe.findAll({})
    const myRecipe=myRecipesData.map((recipe)=>recipe.get({plain:true}));
    res.render('viewRecipes', {
      myRecipe,
      
      loggedIn: req.session.loggedIn
  });

    return res.status(200).json(createRecipe)
  }catch(err){
    return res.status(500).json({message:'Internal server: Could not view your recipes',error:err.message});
  }
});




module.exports = router;
