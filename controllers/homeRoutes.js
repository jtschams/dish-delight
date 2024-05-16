// TODO: Change or add any View routes here

const router = require('express').Router();
const { Recipe, User, Measure, Ingredient, RecipeIngredient } = require('../models');
const withAuth = require('../utils/auth');
//Route to display all recipes
router.get('/', async (req, res) => {
    try {
        const dbRecipes = await Recipe.findAll({
            
        });
        
        const recipes = dbRecipes.map(recipe => recipe.get({ plain: true }));
        
        return res.render('viewRecipes', {
            recipes,
            // Pass the logged in flag to the template
            loggedIn: req.session.loggedIn,
        });
       
    } catch (err) {
      console.error('Error finding ALL recipes:',err);
        return res.status(500).json({message:'Internal server error',error:err.message});
      
    }
});

// Prevent non logged in users from viewing the recipe page
//Route to display a single recipe
router.get('/recipe/:id', /*withAuth,*/ async (req, res) => {
    try {
    const dbRecipeData = await Recipe.findByPk(req.params.id,{ include: [
      {
        model: RecipeIngredient,
        as: 'ingredient_list',
        include: [ Ingredient, Measure]
      }
    ]
    });

    if(!dbRecipeData){
      return res.status(404).json({message:'Recipe not found'});
    }
    const recipe= dbRecipeData.get({plain:true});
    return res.render('viewRecipes',{recipe,
      loggedIn: req.session.loggedIn,
    });
   
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

router.get('/create-recipes',/*withAuth,*/ async(req,res)=>{
  try{
    const dbCreateRecipeData= await Recipe.findAll({});
    const createRecipe=dbCreateRecipeData.map(recipe=> recipe.get({plain:true}));
    return res.render('createRecipes', {
      createRecipe,
      
      loggedIn: req.session.loggedIn
  });

    
  }catch(err){
    console.error('Error retrieving created recipe', err)
    return res.status(500).json({message:'Internal server error',error:err.message});
  }
});


router.get('/my-recipes', /*withAuth,*/ async (req,res)=>{
  try{
    const userData=await User.findByPk(req.session.user_id,{
      include: [{
        model: Recipe,
        as:'my-recipes',
        through:{attributes:[]}
      }
    ]
    });

    if(!userData){
      return res.status(404).json({message:'User not found'});
    }

    const myRecipes= userData.my_recipes.map((recipe)=> recipe.get({plain:true}));

    return res.render('viewRecipes',{
      myRecipes,
      loggedIn: req.session.loggedIn
    });
  }catch(err){
    console.error('Error retrieving my reecipes:',err);
    return res.status(500).json({message:'Internal server error',error:err.message});
  }
})




module.exports = router;
