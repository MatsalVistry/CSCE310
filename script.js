var jQueryScript = document.createElement('script');
jQueryScript.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
document.head.appendChild(jQueryScript);

function doSomething() 
{
    $.ajax({
        type: "GET",
        url: "doSomething.php",
        data: 
        {
        },
        success: function(response) {
            console.log(response);
        }
    });
}


function updateIngredientQuantity()
{
    $.ajax({
        type: "POST",
        url: "ManagerBackend/Ingredients.php",
        data: 
        {
            functionName: "updateIngredientQuantity",
            name: name,
            quantity: quantity
        },
        success: function(response) 
        {
            populateIngredientsView();
        }
    });
}