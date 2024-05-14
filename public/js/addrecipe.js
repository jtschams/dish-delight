async function newFormHandler(event) {
    event.preventDefault();

const user_name = document.querySelector('#user_name').value;
const recipe_name = document.querySelector('#recipe_name').value;
const description = document.querySelector('#description').value;
const ingredients = document.querySelector('#ingredients').value.split('\n');
const instructions = document.querySelector('#instructions').value;

const response = await fetch(`/api/recipes`, {

    method: 'POST',
    body: JSON.stringify({
        user_name,
        recipe_name,
        description,
        ingredients,
        instructions
    }),
    headers: {
        'Content-Type': 'application/json'
    }
}); 

if (response.ok) {
    document.location.replace('/');

} else {
    alert('Failed to add recipe');
    }
}

document
.querySelector('.new-recipe-form')
.addEventListener('submit', newFormHandler);