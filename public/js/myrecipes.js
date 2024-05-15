async function saveFormHandler(event) {
    event.preventDefault();

    const recipe_name = document.querySelector('#recipe_name').value;
    const description = document.querySelector('#description').value;
    const ingredients = document.querySelector('#ingredients').value.split('\n');
    const instructions = document.querySelector('#instructions').value;
    const id = window.location.toString().split('/')[ //
        window.location.toString().split('/').length - 1 
    ];
    const response = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
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
        document.location.replace('/myrecipes'); 
    } else {
        alert('Failed to save recipe'); 
    }
}

document
.querySelector('.save-recipe-form')
.eventListener('submit', saveFormHandler);

//Below is the javascript code for the form submission, im not sure where its actually supposed to go -Andrew
document.getElementById('recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect form data
    const formData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        ingredients: document.getElementById('ingredients').value,
        instructions: document.getElementById('instructions').value
    };

});