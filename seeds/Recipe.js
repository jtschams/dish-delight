const { Recipe }= require('../models');

const recipeData=[
    {
        name:'Grilled Cheese Sandwhich',
        directions:'1. Heat a pan over medium high heat. 2. Butter one side of each slice of bread. 3. Place one slice of bread, butter side down, in the pan. 4. Add cheese slices on top. 5. Place the other slide of bread, butter side up, on top of the cheese 6. Cook until cheese is fully melted and both slices of bread are golden brown. 7. Be sure to serve while hot',
        description:'Cheesy, gooey, crispy perfection',
        picture:'',//TODO:Insert link to image using API
        user_id: 1 
    },
    {
        name:'Sphaghetti and Meatballs',
        directions:'1. Cook spaghetti according to the package instructions. 2. In a large bowl, combine ground beef, parmesan, breadcrumbs, minced garlic, egg, chopped parsley,breadcrumbs, salt, and peppper. 3. Mix until all ingredients are well incorporated, then shape into meatballs. 4. Heat a pan on medium high heat and pan sear the meatballs until they are cooked through fully. 5. In a separate pan, heat up your favorite marinara sauce until its simmering. 6. Add the cooked meatballs into the marinara sauce and simmer for 5 minutes. 7.Plate the sphagetti noodles and spoon the marinara sauce with meatballs in top. 8. Optionally, you can garnish with parsley and additional parmesan cheese ',
        description:'Classic dish of meatballs served over sphagetti noodles, coated with tangy marinara sauce',
        picture:'',
        user_id: 3
    },
    {
        name:'Ceasar Salad',
        directions:'1. Wash and chop romaine lettuce into bite-sized pieces. 2.Place chopped lettuce into a large bowl. 3. To this add croutons, grated parmesan cheese, and drizlle some ceasar salad dressing. 4. Season with salt and pepper. 5. Toss the salad until the chopped lettuce is covered evenly with the toppings and dressing. 6. Sever immediately with your choice of protein or have it as a side dish for your meal',
        description:'A classic salad with romaine lettuce, ceasar salad dressing, croutons,and parmesan cheese',
        picture:'',
        user_id: 1
    },
    {
        name:'Baked Potato',
        directions:'1. Preheat oven to 400°F. 2. Wash the potatoes and poke them several time using a fork. 3. Rub salt and olive oil on the potatoes. 4. Place them on a baking tray and bake for 45-60 minutes (until tender). 5.Remove from the oven and allow to cool slightly. 6. Now cut a small slit at the top of each potato and mash the inside using a fork. 7. Serve while hot with topping, such as butter, chees, sourcream, green onion, chives, and bacon bits.  ',
        description:'Hearty and delicious potato dish',
        picture:'',
        user_id: 2
    },
    

];
const seedRecipe=()=> Recipe.bulkCreate(recipeData);
module.exports=seedRecipe;