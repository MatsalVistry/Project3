$(document).ready(function() 
{
    populateIngredientsView();
});

$(".addNewInventorySubmit").click(function( event ) 
{
    event.preventDefault();
    addInventory();
});

$(".updateInventorySubmit").click(function( event ) 
{
    event.preventDefault();
    updateIngredientQuantity();
});


function populateIngredientsView()
{
    clearView();
    
    $.ajax({
        type: "GET",
        url: "ManagerBackend/Ingredients.php",
        data: 
        {
            functionName: "getAllIngredients"
        },
        success: function(response) 
        {
            var res = JSON.parse(response);

            for(var key in res)
            {
                var ind = res[key];
                var row = document.createElement('tr');
                var name = ind.name;
                name = name.replace(/_/g, " ");
                var quantity = ind.quantity;
                row.innerHTML = "<td>" + name + "<\/td><td>" + quantity + "<\/td>";
                $('.viewAllIngredients').append(row);
            }
        }
    });
}

function updateIngredientQuantity()
{
    var name = $(".updateIngredientName").val();
    var quantity = $(".updateIngredientQuantity").val();
    name = name.replace(/ /g, "_");

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

function addInventory()
{
    var name = $(".addNewIngredientName").val();
    var quantity = $(".addNewIngredientQuantity").val();
    name = name.replace(/ /g, "_");

    $.ajax({
        type: "POST",
        url: "ManagerBackend/Ingredients.php",
        data: 
        {
            functionName: "addIngredient",
            name: name,
            quantity: quantity
        },
        success: function(response) 
        {
            populateIngredientsView();
        }
    });
}

function clearView()
{
    $(".viewAllIngredients").html('');
    var row = document.createElement('tr');
    row.innerHTML = "<td> Name <\/td><td> Quantity <\/td>";
    $('.viewAllIngredients').append(row);
}

// text size change functionality
function small(){
    document.getElementById('content').style.fontSize = "0.9em";
    document.getElementById('Name_1').style.fontSize = "1em";
    document.getElementById('Quantity_1').style.fontSize = "1em";
    document.getElementById('Submit_1').style.fontSize = "1em";

    document.getElementById('Name_2').style.fontSize = "1em";
    document.getElementById('Quantity_2').style.fontSize = "1em";
    document.getElementById('Submit_2').style.fontSize = "1em";
  }
  
  function original(){
    document.getElementById('content').style.fontSize = "initial";
    document.getElementById('Name_1').style.fontSize = "initial";
    document.getElementById('Quantity_1').style.fontSize = "initial";
    document.getElementById('Submit_1').style.fontSize = "initial";

    document.getElementById('Name_2').style.fontSize = "initial";
    document.getElementById('Quantity_2').style.fontSize = "initial";
    document.getElementById('Submit_2').style.fontSize = "initial";

  }
  
  function medium(){
    document.getElementById('content').style.fontSize = "1.1em";
    document.getElementById('Name_1').style.fontSize = "1.1em";
    document.getElementById('Quantity_1').style.fontSize = "1.1em";
    document.getElementById('Submit_1').style.fontSize = "1.1em";

    document.getElementById('Name_2').style.fontSize = "1.1em";
    document.getElementById('Quantity_2').style.fontSize = "1.1em";
    document.getElementById('Submit_2').style.fontSize = "1.1em";
  }
  
  function large(){
    document.getElementById('content').style.fontSize = "1.2em"; 
    document.getElementById('Name_1').style.fontSize = "1.2em"; 
    document.getElementById('Quantity_1').style.fontSize = "1.2em"; 
    document.getElementById('Submit_1').style.fontSize = "1.2em"; 
    
    document.getElementById('Name_2').style.fontSize = "1.2em"; 
    document.getElementById('Quantity_2').style.fontSize = "1.2em"; 
    document.getElementById('Submit_2').style.fontSize = "1.2em"; 
  
  }
  
  function larger(){
    document.getElementById('content').style.fontSize = "1.3em"; 
    document.getElementById('Name_1').style.fontSize = "1.3em"; 
    document.getElementById('Quantity_1').style.fontSize = "1.3em"; 
    document.getElementById('Submit_1').style.fontSize = "1.3em"; 

    document.getElementById('Name_2').style.fontSize = "1.3em"; 
    document.getElementById('Quantity_2').style.fontSize = "1.3em"; 
    document.getElementById('Submit_2').style.fontSize = "1.3em";
  }

  function changeSize(value) 
{
    if(value=="small()")
    {
        small();
    }

    if(value=="original()")
    {
        original();
    }

    if(value=="medium()")
    {
        medium();
    }

    if(value=="large()")
    {
        large();
    }


    if(value=="larger()")
    {
        larger();
    }

    //store the font size
    localStorage.setItem('fontSize', value.toString());
}

window.onload = function(){
    var fontSize = localStorage.getItem('fontSize');

    if(fontSize == null){
        fontSize = "original()";
    }
    console.log(fontSize);
  
    //set the selector font size to the correct font size
    document.getElementById('fontSizes').value=fontSize;
    
    // Convert the String back to a function and calls the function
    var myFunc = eval('(' + fontSize + ')');
  }