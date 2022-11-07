// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  //initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  let recipes = JSON.parse(window.localStorage.getItem('recipes'));
  //document.write(recipes[0]['imgSrc']+"\n");
  if(localStorage.length == 0){
    return []
  }
  return recipes;
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. TODO - Get a reference to the <main> element
  const ma = document.querySelector("main");
  // A11. TODO - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  for (let i = 0; i < recipes.length; i++) {
    let rec = document.createElement("recipe-card");
    let img_rate = "/assets/images/icons/"+recipes[i]['rating']+"-star.svg";
    let img = "<img src=" + recipes[i]['imgSrc'] + " alt=" + recipes[i]['imgAlt'] + ">";
    let title = "<p class='title'> <a href=" + recipes[i]['titleLnk'] + ">" + recipes[i]['titleTxt'] + "</a></p>";
    let organization = "<p class='organization'>" + recipes[i]['organization'] + "</p>";
    let rating = "<div class=\"rating\"> <span>" + recipes[i]['rating'] + "</span>" + "<img src=" + img_rate + " alt=" + recipes[i]['rate'] + " stars><span>(" + recipes[i]['numRatings'] + ")</span></div>";
    let t = "<time>" + recipes[i]['lengthTime'] + "min</time>";
    let ing = "<p class='ingredients'>" + recipes[i]['ingredients'] + "</p>";
    rec.shadowRoot.querySelector("article").innerHTML = img + title + organization + rating + t + ing;
    ma.appendChild(rec);
  }
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  for(let recipe in recipes){
    localStorage.setItem('recipes', recipe.toString());
  }
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  // B2. TODO - Get a reference to the <form> element
  const form = document.createElement("form");
  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  form.addEventListener("submit", function(event){
    event.preventDefault();

    // Steps B4-B9 will occur inside the event listener from step B3
    // B4. TODO - Create a new FormData object from the <form> element reference above
    const formElement = document.querySelector("form");
    const formData = new FormData(formElement);
    // B5. TODO - Create an empty object (I'll refer to this object as recipeObject to
    //            make this easier to read), and then extract the keys and corresponding
    //            values from the FormData object and insert them into recipeObject
    let recipeObject = new Object();
    
    recipeObject = [formData.keys(), formData.values()];
    // B6. TODO - Create a new <recipe-card> element
    let recipe_card = document.createElement("recipe-card");
    // B7. TODO - Add the recipeObject data to <recipe-card> using element.data
    recipe_card.innerHtml = recipeObject.data;
    // B8. TODO - Append this new <recipe-card> to <main>
    document.querySelector("main").appendChild(recipe_card);
    // B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
    //            then save the recipes array back to localStorage
    let res = getRecipesFromStorage();
    res.push(recipeObject);
    saveRecipesToStorage(res);
  });
  // B10. TODO - Get a reference to the "Clear Local Storage" button
  const clear = document.createElement("clear_button");
  // B11. TODO - Add a click event listener to clear local storage button
  clear[0].addEventListener("click", function(event){
    // Steps B12 & B13 will occur inside the event listener from step B11
    // B12. TODO - Clear the local storage
    localStorage.clear();
    // B13. TODO - Delete the contents of <main>
    var e = document.querySelector("main");
        var child = e.lastElementChild; 
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
        }
  });
}

