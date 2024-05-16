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
        directions:'1. Preheat oven to 400°F. 2. Wash the potatoes and poke them several time using a fork. 3. Rub salt and olive oil on the potatoes. 4. Place them on a baking tray and bake for 45-60 minutes (until tender). 5.Remove from the oven and allow to cool slightly. 6. Now cut a small slit at the top of each potato and mash the inside using a fork. 7. Serve while hot with topping, such as butter, cheese, sourcream, green onion, chives, and bacon bits.  ',
        description:'Hearty and delicious potato dish',
        picture:'',
        user_id: 2
    },
    {
        name: 'Ground Beef Casserole',
        description: 'This ground beef casserole is a hearty and comforting dish that\'s perfect for a weeknight dinner. It\'s easy to make and packed with flavor, making it a family favorite.',
        directions:`1. Preheat the oven to 375°F. 
        2. Cook the penne according to package instructions, then drain and set aside. 
        3. In a large skillet, heat the olive oil over medium heat. Add the ground beef, chopped onion, and minced garlic. Cook until the beef is browned and the onion is softened. 
        4. Stir in the marinara sauce, salt, and pepper. Simmer for 5 minutes. 
        5. In a greased baking dish, layer half of the cooked penne, followed by half of the beef mixture, and half of the shredded cheddar cheese. Repeat the layers. 
        6. Bake for 20-25 minutes, or until the cheese is melted and bubbly. 
        7. Remove from the oven and let it cool for a few minutes before serving.`,
        picture:'https://th.bing.com/th/id/OIP.Fvm8EN5E3p9D7HNky0XGPQHaLH?w=197&h=296&c=7&r=0&o=5&pid=1.7',
        user_id: 3
    },

    {
        name:'Garlic Butter Chicken Tenders',
        description:'These garlic butter chicken tenders are so juicy and tender, you want to keep digging in for more',
        directions:`1. Preheat the oven to 375°F. 
        2. Combine the flour, salt, pepper, and garlic powder in a shallow dish. 
        3. Dredge the chicken tenders in the flour mixture, shaking off any excess. 
        4. In a large skillet, melt the butter over medium heat. Add the minced garlic and cook for 1 minute. 
        5. Add the chicken tenders to the skillet and cook for 3-4 minutes per side, or until golden brown. 
        6. Drizzle the lemon juice over the chicken tenders and bake for 15 minutes, or until the chicken is cooked through. 
        7. Remove from the oven and let it cool for a few minutes before serving.`,
        picture:'https://th.bing.com/th?id=OSK.1f1dc7375dc081a48cb8c2e8eaa4f318&w=213&h=213&rs=2&qlt=80&o=6&cdv=1&pid=16.1',
        user_id: 2


    },
    {
        name:'Baked Cod',
        description:'This baked cod recipe is a simple and delicious way to prepare cod fillets.The fish is seasoned with a mixture of lemon, garlic, and herbs, then baked to perfection It is a healthy and flavorful dish that is perfect for a quick and easy weeknight dinner',
        directions:'1. Preheat the oven to 400°F. 2. Place the cod fillets in a greased baking dish.3. In a small bowl, whisk together the olive oil, lemon juice, garlic, oregano, thyme, salt, and pepper. 4. Pour the mixture over the cod fillets, making sure they are evenly coated. 5. Bake for 15-20 minutes, or until the fish is cooked through and flakes easily with a fork. 6. Garnish with fresh parsley and serve immediately.',
        picture:'https://th.bing.com/th?id=OSK.ca633fdcbeb23bbb826e7efb40f0c5df&w=213&h=213&rs=2&qlt=80&o=6&cdv=1&pid=16.1',
        user_id: 3

    },
    {
        name:'Cauliflower Tacos',
        description:'',
        directions:'1. Preheat the oven to 425°F. 2. Toss the cauliflower florets with the olive oil, chili powder, cumin, garlic powder, salt, and pepper. 3. Spread the cauliflower on a baking sheet in a single layer and roast for 20-25 minutes, or until golden brown and crispy. 4. Warm the tortillas in a dry skillet over medium heat.5. Divide the cauliflower, red cabbage, and cilantro among the tortillas. 6. Drizzle with the avocado sauce and serve immediately.',
        picture:'https://th.bing.com/th?id=OSK.6dbfe30324418be0b14a1aa15fa98381&w=213&h=319&rs=2&qlt=80&o=6&cdv=1&pid=16.1',
        user_id:2

    },
    

];
const seedRecipe=()=> Recipe.bulkCreate(recipeData);
module.exports=seedRecipe;