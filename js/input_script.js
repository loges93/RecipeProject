let ingredientsClone;
let directionsClone;
let iterator = 2;
function getClones(){
    ingredientsClone = document.querySelector(".ingredient-input-component").cloneNode(true);
    directionsClone = document.querySelector(".direction-input-component").cloneNode(true);

}

function appendClone(clone){
    if(clone == "ingredient"){
        let ing_area = document.querySelector("#ingredients-input-area");
        let newClone = ingredientsClone.cloneNode(true);
        ing_area.appendChild(newClone);
    }
    else if(clone == "direction"){
        let dir_area = document.querySelector("#directions-input-area");
        let newClone = directionsClone.cloneNode(true);
        dir_area.append(newClone);
    }
}


function processForm(){
    //Get error display element-------------------------------------------------------------
    let errorDisplay = document.querySelector("#form-error");
    //Stores new recipe---------------------------------------------------------------------
    let newRecipe = {};
    //Process title-------------------------------------------------------------------------
    let titleEl = document.querySelector("#title-input");
    if(titleEl.value != ""){
        newRecipe.title = titleEl.value;
    }
    else{
        errorDisplay.innerHTML = "Please Enter A Title."
        return;
    }

    //Process image-----------------------------------------------------------------------------
    let imageEl = document.querySelector("#image-input");

    if(imageEl.value != ""){
        let fileReader = new FileReader();
        fileReader.readAsDataURL(imageEl.files[0]);
        fileReader.onload = () => {
            sessionStorage.setItem("pic", fileReader.result);
        }
        newRecipe.image = (sessionStorage.getItem("pic"));
    }
    else{
        errorDisplay.innerHTML = "Please Select An Image.";
        return;
    }
    //Process Preparation time input------------------------------------------------------------
    let prepEl = document.querySelector("#prep-input");
    try {
        let preptime = prepEl.value;
        if(preptime === ""){
            errorDisplay.innerHTML = "Please Enter A Prep Time.";
            return;
        }
        else{
            newRecipe.preparation = `${preptime}`;
        }
    }
    catch(err){
        errorDisplay.innerHTML = "Please Enter A Valid Prep Time.";
        return;
    }
    //Process Cooking time input--------------------------------------------------------------
    let cooktimeEl = document.querySelector("#cook-input");
    try {
        let cooktime = cooktimeEl.value;
        if(cooktime === ""){
            errorDisplay.innerHTML = "Please Enter A Cook Time That Is Above 0.";
            return;
        }
        else{
            newRecipe.cooking_time =`${cooktime}`;
        }
    }
    catch(err){
        errorDisplay.innerHTML = "Please Enter A Valid Cook Time.";
        return;
    }
    //Process Serving input------------------------------------------------------------------
    let servingEl = document.querySelector("#servings-input");
    try {
        let servings = parseInt(servingEl.value);
        if(servings <= 0){
            errorDisplay.innerHTML = "Please Enter A Serving Amount That Is Above 0.";
            return;
        }
        else{
            newRecipe.servings = servings;
        }
    }
    catch(err){
        errorDisplay.innerHTML = "Please Enter Valid Serving Amount.";
        return;
    }
    //Process Ingredients ----------------------------------------------------------------------
    processAllIngredients(newRecipe);
    //Process Directions------------------------------------------------------------------------
    processAllDirections(newRecipe);
    AddRecipe(newRecipe);
    
}

function processAllIngredients(newRecipe){
    let names = document.querySelectorAll(".ingredient-name-input");
    let amounts = document.querySelectorAll(".amount-num");
    let unit_options = document.querySelectorAll(".unit-options");

    let ingredients = [];
    for(let i = 0; i < names.length; i++){
        let ingredient = {};
        ingredient.substance = names[i].value;
        ingredient.amount = amounts[i].value;
        ingredient.unit = unit_options[i].value;
        ingredients.push(ingredient);
    }
    newRecipe.ingredients = ingredients;
}
function processAllDirections(newRecipe){
    let directionsEl = document.querySelectorAll(".directions-input");
    let directions = [];
    for(let i = 0; i < directionsEl.length; i++){
        directions.push(directionsEl[i].value);
    }
    newRecipe.directions = directions;
}

function AddRecipe(recipe){
    recipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    document.querySelector('form').reset();
    window.location.href="index.html";
}










