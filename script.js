
//script.js//


var recipes = [];

// Load recipes from localStorage if available
if (localStorage.getItem("recipes")) {
    recipes = JSON.parse(localStorage.getItem("recipes"));
}

function addRecipe() {
    var input = document.getElementById("recipeInput").value;
    if (input === "") {
        alert("Please enter a recipe!");
        return;
    }
    var recipeObj = {
        recipe: input,
        timestamp: new Date().getTime() // Save the current timestamp
    };
    recipes.push(recipeObj);
    saveRecipesToLocalStorage();
    displayRecipes();
    document.getElementById("recipeInput").value = "";
}

function displayRecipes() {
    var ul = document.getElementById("recipeList");
    ul.innerHTML = "";
    recipes.forEach(function(recipeObj) {
        var li = document.createElement("li");
        li.textContent = recipeObj.recipe;
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            deleteRecipe(recipeObj);
        };
        
        var currentTimestamp = new Date().getTime();
        var recipeTimestamp = recipeObj.timestamp;
        var elapsedTime = currentTimestamp - recipeTimestamp;
        if (elapsedTime <= 60000) { // 3600000 milliseconds = 1 hour
            deleteButton.disabled = false;
            li.appendChild(deleteButton);
        } else {
            deleteButton.disabled = true;
            li.appendChild(deleteButton);
        }
        ul.appendChild(li);
    });
}

function deleteRecipe(recipeObj) {
    var index = recipes.indexOf(recipeObj);
    if (index !== -1) {
        recipes.splice(index, 1);
        saveRecipesToLocalStorage();
        displayRecipes();
    }
}

function saveRecipesToLocalStorage() {
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

// Initially display all recipes
displayRecipes();


const password = document.querySelector('.passwordElement')


function checkPassword () {
    if (password.value === 'chutes') {
        recipes.splice(1, 200);
        saveRecipesToLocalStorage();
        displayRecipes();
    }
}
