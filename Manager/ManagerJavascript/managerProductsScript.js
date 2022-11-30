$(document).ready(function() 
{
    populateProductsView();
    populateCheckboxes();
    closeCheckboxes();

    // grab select value with class of addNewProductGroup
    var val = $(".addNewProductGroup").val();

    if(val=="food")
    {
        $(".ff").show();
        $(".dd").hide();
        $(".addNewProductSubgroup").val("sandwiches");

    }
    else
    {
        $(".ff").hide();
        $(".dd").show();
        $(".addNewProductSubgroup").val("coffee");
    }
});

// on change for addNewProductGroup select 
$(".addNewProductGroup").change(function()
{
    var val = $(".addNewProductGroup").val();

    if(val=="food")
    {
        $(".ff").show();
        $(".dd").hide();
        $(".addNewProductSubgroup").val("sandwiches");
    }
    else
    {
        $(".ff").hide();
        $(".dd").show();
        $(".addNewProductSubgroup").val("coffee");
    }
});

$(".addProductSubmit").click(function( event ) 
{
    event.preventDefault();
    addProduct();
});

$(".updateProductSubmit").click(function( event ) 
{
    event.preventDefault();
    updateProduct();
});


function populateProductsView()
{
    clearView();
    
    $.ajax({
        type: "GET",
        url: "ManagerBackend/Products.php",
        data: 
        {
            functionName: "getAllBaseProducts"
        },
        success: function(response) 
        {
            var res = JSON.parse(response);

            for(var key in res)
            {
                var ind = res[key];
                var row = document.createElement('tr');
                var id = ind.id;
                var name = ind.name;
                name = name.replace(/_/g, " ");
                var price = ind.price;
                var group = ind.group;
                var subgroup = ind.subgroup;
                row.innerHTML = "<td>" + id + "<\/td><td>" + name + "<\/td><td>" + price + "<\/td><td>" + group + "<\/td><td>" + subgroup + "<\/td>";
                $('.viewAllProducts').append(row);
            }
        }
    });
}

function addProduct()
{
    var name = $(".addNewProductName").val();
    var price = $(".addNewProductPrice").val();
    var group = $(".addNewProductGroup").val();
    var subgroup = $(".addNewProductSubgroup").val();
    var ingredients = [];
    name = name.replace(/ /g, "_");

    var checkboxes = document.getElementsByClassName("addCheckboxIngredient");
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            ingredients.push(checkboxes[i].value);
        }
    }

    $.ajax({
        type: "POST",
        url: "ManagerBackend/Products.php",
        data: 
        {
            functionName: "addBaseProduct",
            name: name,
            price: price,
            group: group,
            subgroup: subgroup,
            ingredients: ingredients
        },
        success: function(response) 
        {
            populateProductsView();
            populateCheckboxes();
        }
    });
}

function updateProduct()
{
    var name = $(".updateProductName").val();
    var price = $(".updateProductPrice").val();
    var ingredients = [];
    name = name.replace(/ /g, "_");

    var checkboxes = document.getElementsByClassName("updateCheckboxIngredient");
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            ingredients.push(checkboxes[i].value);
        }
    }

    $.ajax({
        type: "POST",
        url: "ManagerBackend/Products.php",
        data: 
        {
            functionName: "updateBaseProduct",
            name: name,
            price: price,
            ingredients: ingredients
        },
        success: function(response) 
        {
            populateProductsView();
            populateCheckboxes();
        }
    });
}

function populateCheckboxes()
{
    clearCheckboxes();

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
                var row = document.createElement('label');
                var name = ind.name;
                row.innerHTML = "<input type='checkbox' value="+name+" class='addCheckboxIngredient'/>"+name;
                $('.unorderedIngredientListAdd').append(row);

                var row2 = document.createElement('label');
                var name = ind.name;
                row2.innerHTML = "<input type='checkbox' value="+name+" class='updateCheckboxIngredient'/>"+name;
                $('.unorderedIngredientListUpdate').append(row2);
            }
        }
    });
}

function clearView()
{
    $(".viewAllProducts").html('');
    var row = document.createElement('tr');
    row.innerHTML = "<td> ID <\/td><td> Name <\/td><td> Price <\/td><td> Group <\/td><td> Subgroup <\/td>";
    $('.viewAllProducts').append(row);
}
  
function toggleCheckboxArea(onlyHide = false) 
{
    var checkboxes = document.getElementsByClassName("unorderedIngredientListAdd")[0];
    var displayValue = checkboxes.style.display;

    if (displayValue != "block") {
        if (onlyHide == false) {
        checkboxes.style.display = "block";
        }
    } else {
        checkboxes.style.display = "none";
    }
}

function toggleCheckboxArea2(onlyHide = false) 
{
    var checkboxes = document.getElementsByClassName("unorderedIngredientListUpdate")[0];
    var displayValue = checkboxes.style.display;

    if (displayValue != "block") {
        if (onlyHide == false) {
        checkboxes.style.display = "block";
        }
    } else {
        checkboxes.style.display = "none";
    }
}
function clearCheckboxes()
{
    $(".unorderedIngredientListAdd").html('');
    $(".unorderedIngredientListUpdate").html('');
}

function closeCheckboxes()
{
    var checkboxes = document.getElementsByClassName("unorderedIngredientListAdd")[0];
    checkboxes.style.display = "none";

    var checkboxes2 = document.getElementsByClassName("unorderedIngredientListUpdate")[0];
    checkboxes2.style.display = "none";
}

// text size change functionality
function small(){
    document.getElementById('VAP').style.fontSize = "0.9em";
    document.getElementById('ANP').style.fontSize = "0.9em";
    document.getElementById('UP').style.fontSize = "0.9em";
    document.getElementById('Name_1').style.fontSize = "0.9em";
    document.getElementById('Group_1').style.fontSize = "0.9em";
    document.getElementById('SubGroup_1').style.fontSize = "0.9em";
    document.getElementById('Price_1').style.fontSize = "0.9em";
    document.getElementById('Ingredients_1').style.fontSize = "0.9em";
    document.getElementById('Insert_1').style.fontSize = "0.9em";

    
    document.getElementById('Name_2').style.fontSize = "0.9em";
    // document.getElementById('Group_2').style.fontSize = "0.9em";
    // document.getElementById('SubGroup_2').style.fontSize = "0.9em";
    document.getElementById('Price_2').style.fontSize = "0.9em";
    document.getElementById('Ingredients_2').style.fontSize = "0.9em";
    document.getElementById('Insert_2').style.fontSize = "0.9em";
  }
  
  function original(){
    document.getElementById('VAP').style.fontSize = "initial"; 
    document.getElementById('ANP').style.fontSize = "initial";
    document.getElementById('UP').style.fontSize = "initial";
    document.getElementById('Name_1').style.fontSize = "initial";
    document.getElementById('Group_1').style.fontSize = "initial";
    document.getElementById('SubGroup_1').style.fontSize = "initial";
    document.getElementById('Price_1').style.fontSize = "initial";
    document.getElementById('Ingredients_1').style.fontSize = "initial"; 
    document.getElementById('Insert_1').style.fontSize = "initial"; 
    
    document.getElementById('Name_2').style.fontSize = "initial";
    // document.getElementById('Group_2').style.fontSize = "initial";
    // document.getElementById('SubGroup_2').style.fontSize = "initial";
    document.getElementById('Price_2').style.fontSize = "initial";
    document.getElementById('Ingredients_2').style.fontSize = "initial"; 
    document.getElementById('Insert_2').style.fontSize = "initial"; 

  }
  
  function medium(){
    document.getElementById('VAP').style.fontSize = "1.1em"; 
    document.getElementById('ANP').style.fontSize = "1.1em"; 
    document.getElementById('UP').style.fontSize = "1.1em"; 
    document.getElementById('Name_1').style.fontSize = "1.1em";
    document.getElementById('Group_1').style.fontSize = "1.1em";
    document.getElementById('SubGroup_1').style.fontSize = "1.1em";
    document.getElementById('Price_1').style.fontSize = "1.1em";
    document.getElementById('Ingredients_1').style.fontSize = "1.1em";
    document.getElementById('Insert_1').style.fontSize = "1.1em";

    document.getElementById('Name_2').style.fontSize = "1.1em";
    // document.getElementById('Group_2').style.fontSize = "1.1em";
    // document.getElementById('SubGroup_2').style.fontSize = "1.1em";
    document.getElementById('Price_2').style.fontSize = "1.1em";
    document.getElementById('Ingredients_2').style.fontSize = "1.1em";
    document.getElementById('Insert_2').style.fontSize = "1.1em";

  }
  
  function large(){
    document.getElementById('VAP').style.fontSize = "1.2em"; 
    document.getElementById('ANP').style.fontSize = "1.2em"; 
    document.getElementById('UP').style.fontSize = "1.2em"; 
    document.getElementById('Name_1').style.fontSize = "1.2em";
    document.getElementById('Group_1').style.fontSize = "1.2em";
    document.getElementById('SubGroup_1').style.fontSize = "1.2em";
    document.getElementById('Price_1').style.fontSize = "1.2em";
    document.getElementById('Ingredients_1').style.fontSize = "1.2em"; 
    document.getElementById('Insert_1').style.fontSize = "1.2em";

    document.getElementById('Name_2').style.fontSize = "1.2em";
    // document.getElementById('Group_2').style.fontSize = "1.2em";
    // document.getElementById('SubGroup_2').style.fontSize = "1.2em";
    document.getElementById('Price_2').style.fontSize = "1.2em";
    document.getElementById('Ingredients_2').style.fontSize = "1.2em";
    document.getElementById('Insert_2').style.fontSize = "1.2em"; 

  
  }
  
  function larger(){
    document.getElementById('VAP').style.fontSize = "1.3em"; 
    document.getElementById('ANP').style.fontSize = "1.3em";
    document.getElementById('UP').style.fontSize = "1.3em";
    document.getElementById('Name_1').style.fontSize = "1.3em"; 
    document.getElementById('Group_1').style.fontSize = "1.3em"; 
    document.getElementById('SubGroup_1').style.fontSize = "1.3em"; 
    document.getElementById('Price_1').style.fontSize = "1.3em"; 
    document.getElementById('Ingredients_1').style.fontSize = "1.3em"; 
    document.getElementById('Insert_1').style.fontSize = "1.3em"; 

    document.getElementById('Name_2').style.fontSize = "1.3em"; 
    // document.getElementById('Group_2').style.fontSize = "1.3em"; 
    // document.getElementById('SubGroup_2').style.fontSize = "1.3em"; 
    document.getElementById('Price_2').style.fontSize = "1.3em"; 
    document.getElementById('Ingredients_2').style.fontSize = "1.3em"; 
    document.getElementById('Insert_2').style.fontSize = "1.3em"; 

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
    //retrieve previous font size
    var fontSize = localStorage.getItem('fontSize');
    if(fontSize == null){
        fontSize = 'original()';
    }
  
    //set the selector font size to the correct font size
    document.getElementById('fontSizes').value=fontSize;
    
    // Convert the String back to a function and calls the function
    var myFunc = eval('(' + fontSize + ')');

  }