
//Seed recipes

let seedrecipe = {
    title: "Ham and Asparagus Fettuccine",
    image: "images/hamfettuccini.jpg",
    servings: 6,
    preparation: "5 minutes",
    cooking_time: "15 minutes",
    ingredients: [
        {
            substance: "dry fettuccini noodles",
            amount: 12,
            unit: "ounce"
        },
        {
            substance: "fresh asparagus",
            amount: 1,
            unit: "ounce"
        },
        {
            substance: "butter",
            amount: .5,
            unit: "cup"
        },
        {
            substance: "heavy cream",
            amount: 2,
            unit: "cup"
        },
        {
            substance: "grated Parmesan cheese",
            amount: .75,
            unit: "cup"
        },
        {
            substance: "garlic powder",
            amount: .25,
            unit: "teaspoon"
        },
        {
            substance: "ground black pepper",
            amount: .25,
            unit: "teaspoon"
        },
        {
            substance: "cayenne pepper",
            amount: .25,
            unit: "teaspoon"
        },
        {
            substance: "diced cooked ham",
            amount: 1,
            unit: "pound"
        }
    ],
    directions: [
        "Bring a large pot of lightly salted water to a boil. Add pasta and cook for 8 to 10 minutes or until al dente. Stir asparagus into pot in the last five minutes of cooking; drain.",
        "While pasta is cooking, heat butter and cream in a medium saucepan over medium heat. When mixture begins to bubble, stir in Parmesan, garlic powder, pepper and cayenne. Continue cooking until mixture thickens, stirring occasionally. Stir in ham and heat through.",
        "Toss pasta and asparagus with sauce and serve immediately.",
    ]
}
let seedrecipe2 = {
    title: "Kamichi And Sausage Pizza",
    image: "images/pizza.jpg",
    servings: 6,
    preparation: "10 minutes",
    cooking_time: "20 minutes",
    ingredients: [
        {
            substance: "pizza dough",
            amount: 2,
            unit: "lb"
        },
        {
            substance: "cabbage kimichi",
            amount: 8,
            unit: "ounce"
        },
        {
            substance: "flour",
            amount: 1,
            unit: "tbsp"
        },
        {
            substance: "cornmeal",
            amount: 1,
            unit: "tbsp"
        },
        {
            substance: "marinara sauce",
            amount: 1,
            unit: "cup"
        },
        {
            substance: "shredded mozzarela",
            amount: 1,
            unit: "cup"
        },
        {
            substance: "Italian sausage",
            amount: 8,
            unit: "ounce"
        },
        {
            substance: "basil leaves",
            amount: "garnish",
            unit: " "
        },
    ],
    directions: [
        "Prepare Pizza Dough",
        "Preheat pizza stone",
        "Prepare Kimchi",
        "Roll out pizza dough",
        "Prepare pizza peel",
        "Top the pizza",
        "Bake the pizza",
        "Serve"
    ]
}

let recipes = [];
let recipe1 = {};
if (localStorage.getItem("recipes")===null){
    
    recipes.push(seedrecipe);
    recipes.push(seedrecipe2);
    localStorage.setItem("recipes", JSON.stringify(recipes));

}
else{
    recipes = JSON.parse(localStorage.getItem("recipes"));
}

recipe1 = recipes[0];
function loadSelectRecipe(){
    let recipeSelectElement = document.querySelector("#recipe-select");
    for(let i = 0; i < recipes.length; i++){
        //Create Option Element
        let option = document.createElement("option");
        option.innerHTML = recipes[i].title;
        option.value = i;
        recipeSelectElement.appendChild(option);
    }
}

function loadRecipe(recipe) {
    //Get recipe at recipeIndex
    current_recipe = recipe;
    //Load title
    let title_header = document.querySelector("#recipe-title");
    title_header.innerHTML = current_recipe.title;
    //Load Image
    let recipe_image = document.querySelector("#recipe-image");
    recipe_image.src = current_recipe.image;
    //Load prep time
    let recipe_preptime = document.querySelector("#prep-time");
    recipe_preptime.innerHTML = `Prep-Time: ${current_recipe.preparation}`;
    //Load cook time
    let recipe_cooktime = document.querySelector("#cook-time");
    recipe_cooktime.innerHTML = `Cook-Time: ${current_recipe.cooking_time}`;
    //Load servings
    let recipe_servings = document.querySelector("#serving-number");
    recipe_servings.value = current_recipe.servings;
    recipe_servings.innerHTML = current_recipe.servings;
    //Load ingredients
    loadIngredients(current_recipe);
    //Load directions
    loadDirections(current_recipe);
}
//Loads ingredients
function loadIngredients(recipe) {
    let ingredients_list = document.querySelector("#ingredients-list");
    while (ingredients_list.firstChild){
        ingredients_list.removeChild(ingredients_list.firstChild);
    }
    for (let i = 0; i < recipe.ingredients.length; i++) {
        let ingredient = recipe.ingredients[i];
        let ing_listitem = document.createElement("li");
        ing_listitem.setAttribute("data-aos", "zoom-in");
        let ing_substance = document.createElement("span");
        let ing_amount = document.createElement("span");
        ing_amount.classList.add("ing-amount");
        let ing_unit = document.createElement("span");
        ing_unit.innerHTML = ingredient.unit;
        ing_substance.innerHTML = ingredient.substance;
        ing_amount.innerHTML = ingredient.amount;
        ing_listitem.appendChild(ing_substance);
        ing_listitem.appendChild(ing_amount);
        ing_listitem.appendChild(ing_unit);
        ingredients_list.appendChild(ing_listitem);
    }
}
function loadDirections(recipe) {
    let directions_list = document.querySelector("#directions-list");
    while (directions_list.firstChild){
        directions_list.removeChild(directions_list.firstChild);
    }
    for (let i = 0; i < recipe.directions.length; i++) {
        let directionContent = recipe.directions[i];
        let directionElement = document.createElement("li");
        directionElement.innerHTML = directionContent;
        directions_list.appendChild(directionElement);
    }
}

//Shows ingredients when clicked
let ing_expanded = 0;
function expandIngredients() {
    let ing_list = document.querySelector("#ingredients-list");
    let ing_btn = document.querySelector(".ing_btn");
    if (ing_expanded === 1) {
        ing_list.style.maxHeight = "0";
        ing_btn.innerHTML = "+";
        ing_expanded = 0;
    }
    else {
        ing_list.style.maxHeight = "1000px";
        ing_btn.innerHTML = "-";
        ing_expanded = 1;
    }

}
let dir_expanded = 0;
//Shows directions when clicked
function expandDirections() {
    let dir_list = document.querySelector("#directions-list");
    let dir_btn = document.querySelector(".dir_btn");
    if (dir_list.clientHeight > 1) {
        dir_list.style.maxHeight = "0";
        dir_btn.innerHTML = "+";
    }
    else {
        dir_list.style.maxHeight = "1000px";
        dir_btn.innerHTML = "-";
    }

}

//Change amounts of ingredients based on input
function changeAmounts(new_servings) {
    let current_servings = document.querySelector("#serving-number");
    let changeTo;
    let amounts = document.querySelectorAll(".ing-amount");
    if (new_servings.value === "normal"){
        changeTo = current_recipe.servings;
    }
    else if(new_servings.value === "half"){
        changeTo = Math.ceil(current_recipe.servings/2);
    }
    else if (new_servings.value === "double"){
        changeTo = current_recipe.servings * 2;
    }
    else{
        changeTo = new_servings.value;
    }
    for (let i = 0; i < amounts.length; i++) {
        let single_serv = amounts[i].innerHTML / current_servings.innerHTML;
        let new_amount = Math.ceil((single_serv * changeTo) * 2) / 2;
        amounts[i].innerHTML = new_amount;
        
    }
    current_servings.innerHTML = changeTo;
}

function changeRecipe(index){
    if(index){
        current_recipe = recipes[index];
        loadRecipe(current_recipe);
    }
}
function DeleteRecipe(){
    let selectRecipes = document.querySelector("#recipe-select");
    let selectIndex = selectRecipes.value;
    if(recipes.length>1){
        let index = recipes.indexOf(current_recipe);
        recipes.splice(index, 1);
        loadRecipe(recipes[0]);
        selectRecipes.removeChild(selectRecipes.children[index+1]);
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }
    else{
        console.log(`Cannot delete length of ${recipes.length}`);
    }
        
}


