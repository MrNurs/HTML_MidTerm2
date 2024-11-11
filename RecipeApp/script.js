const apiKey = "2342f5793d0a46a9bfa946b3fd26af49"; 
const searchInput = document.getElementById("search");
const submitButton = document.getElementById("submit");
const resultsContainer = document.getElementById("results");
const suggestionsContainer = document.getElementById("suggestions"); 
const cancelBtn = document.getElementById("cancelBtn");
searchInput.addEventListener("input", async (event) => {
    const query = event.target.value.trim();
    if (query) {
        await getSearchSuggestions(query); 
    } else {
        suggestionsContainer.innerHTML = ""; 
    }
});

async function getSearchSuggestions(query) {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/autocomplete?query=${query}&number=5&apiKey=${apiKey}`);
        const data = await response.json();
        suggestionsContainer.innerHTML = ""; 
        data.forEach(suggestion => {
            const suggestionItem = document.createElement("div");
            suggestionItem.classList.add("suggestion-item");
            suggestionItem.innerHTML = suggestion.title;
            suggestionItem.addEventListener("click", () => {
                searchInput.value = suggestion.title;
                searchRecipes(suggestion.title); 
                suggestionsContainer.innerHTML = ""; 
            });

            suggestionsContainer.appendChild(suggestionItem);
        });
    } catch (error) {
        console.error("Error:", error);
        suggestionsContainer.innerHTML = "<p>Sorry, we couldn't get suggestions.</p>";
    }
}

submitButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        searchRecipes(query);
    }
});

async function searchRecipes(query) {
  
    resultsContainer.innerHTML = '<p>Loading...</p>'; 
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            displayResults(data.results);
        } else {
            resultsContainer.innerHTML = "<p>Sorry, there are no recipes.</p>";
        }
    } catch (error) {
        console.error("Error:", error);
        resultsContainer.innerHTML = "<p>Sorry, there was an issue fetching the recipes. Please try again later.</p>";
    }
}

function displayResults(recipes) {
    resultsContainer.innerHTML = "";  
    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        recipeCard.innerHTML = `
            <img src="https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <button class="btn" onclick="getRecipeDetails(${recipe.id})">More</button>
        `;
        resultsContainer.appendChild(recipeCard);
    });
}

async function getRecipeDetails(id) {   
    cancelBtn.classList.remove("hidden");
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
        const recipe = await response.json();
        const calories = recipe.nutrition?.nutrients?.find(nutrient => nutrient.name === "Calories")?.amount || "N/A";
        const modalContent = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>Ingredients:</h3>
            <ul>${recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join("")}</ul>
            <h3>Instructions:</h3>
            <p>${recipe.instructions || "No instructions provided."}</p>
            <p><strong>Calories:</strong> ${calories}</p>
        `;
        document.getElementById("results_info").innerHTML = modalContent; 
        document.getElementById("results_info").scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (error) {
        console.error("Error:", error);
    }
}
cancelBtn.addEventListener("click", () => {
    cancelBtn.classList.add('hidden');
    document.getElementById("results_info").innerHTML = ''; 
});
