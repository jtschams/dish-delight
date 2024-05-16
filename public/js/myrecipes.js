async function saveFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const ingredients = document.querySelector('#ingredients').value.split('\n');
    const directions = document.querySelector('#instructions').value;
    const id = window.location.toString().split('/')[ //
        window.location.toString().split('/').length - 1 
    ];
    const response = await fetch(`/api/recipes/${id}`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            description,
            ingredients,
            directions
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
.querySelector("#recipe-form")
.addEventListener('submit', saveFormHandler);

