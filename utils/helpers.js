// TODO: Define any custom Handlebars helper functions here
//Below is the javascript code for the form submission, im not sure where its actually supposed to go, edit I put it in here actually. -Andrew
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


module.exports = {

};
