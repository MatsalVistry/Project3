cart = [];
isServer = null;
serverID = null;
currentProduct = null;
displayName = null;
productPrice = 0;
isFood = false;

$(document).ready(function () {
    resetPage();
});

function resetPage()
{
    cart = [];
    clearMenu();
    populateCoffee();
    populateTeas();
    populateSandwich();
    populateCookie();
    populateMuffin();
    repopulateCart();
  
    isServer = localStorage.getItem("isServer");
    serverID = localStorage.getItem("serverID");
  
    if (isServer == null || serverID == null) {
      isServer = false;
      serverID = 11;
    }
}

function clearMenu() {
    $(".coffee").html("");
    $(".tea").html("");
    $(".sandwich").html("");
    $(".cookie").html("");
    $(".muffin").html("");
  }

function populateCoffee() 
{
    $.ajax({
        type: "GET",
        url: "ServerPHP/serverGetRequests.php",
        data: {
        function: "getAllBaseProducts",
        group: "drinks",
        subgroup: "coffee",
        },
        success: function (response) {
        var res = JSON.parse(response);

        var newHTML = "";
        for (var key in res) 
        {
            var ind = res[key];
            var id = ind.id;
            var price = ind.price;
            var name = ind.name.split("_").join(" ");

            newHTML += '<div class="coffee-product" onclick=show(this) style="cursor: pointer;">';
            newHTML +=      '<div class="top-sp">';
            newHTML +=          '<div class ="img-cont">';
            newHTML +=              '<img src="../imgs/caramel_latte.png" alt="">';
            newHTML +=          '</div>';
            newHTML +=          '<div class ="prodName-cont">';
            newHTML +=              '<div class="product-label">';
            newHTML +=                  '<div class="productName" value="'+name+'">' +name+ '</div>';
            newHTML +=                  '<div class="price notranslate">$' +parseFloat(price).toFixed(2)+ '</div>';
            newHTML +=              '</div>';
            newHTML +=          '</div>';
            newHTML +=      '</div>';
            newHTML += '</div>';
        }
        $(".coffee").html(newHTML);

        },
    });
}

function populateTeas() 
{
    $.ajax({
        type: "GET",
        url: "ServerPHP/serverGetRequests.php",
        data: {
        function: "getAllBaseProducts",
        group: "drinks",
        subgroup: "teas",
        },
        success: function (response) {
        var res = JSON.parse(response);

        var newHTML = "";
        for (var key in res) 
        {
            var ind = res[key];
            var id = ind.id;
            var price = ind.price;
            var name = ind.name.split("_").join(" ");

            newHTML += '<div class="coffee-product" onclick=show(this) style="cursor: pointer;">';
            newHTML +=      '<div class="top-sp">';
            newHTML +=          '<div class ="img-cont">';
            newHTML +=              '<img src="../imgs/caramel_latte.png" alt="">';
            newHTML +=          '</div>';
            newHTML +=          '<div class ="prodName-cont">';
            newHTML +=              '<div class="product-label">';
            newHTML +=                  '<div class="productName" value="'+name+'">' +name+ '</div>';
            newHTML +=                  '<div class="price notranslate">$' +parseFloat(price).toFixed(2)+ '</div>';
            newHTML +=              '</div>';
            newHTML +=          '</div>';
            newHTML +=      '</div>';
            newHTML += '</div>';
        }
        $(".teas").html(newHTML);

        },
    });
}

function populateSandwich() 
{
    $.ajax({
        type: "GET",
        url: "ServerPHP/serverGetRequests.php",
        data: {
        function: "getAllBaseProducts",
        group: "food",
        subgroup: "sandwich",
        },
        success: function (response) {
        var res = JSON.parse(response);

        var newHTML = "";
        for (var key in res) 
        {
            var ind = res[key];
            var id = ind.id;
            var price = ind.price;
            var name = ind.name.split("_").join(" ");

            newHTML += '<div class="coffee-product" onclick=showFood(this) style="cursor: pointer;">';
            newHTML +=      '<div class="top-sp">';
            newHTML +=          '<div class ="img-cont">';
            newHTML +=              '<img src="../imgs/caramel_latte.png" alt="">';
            newHTML +=          '</div>';
            newHTML +=          '<div class ="prodName-cont">';
            newHTML +=              '<div class="product-label">';
            newHTML +=                  '<div class="productName" value="'+name+'">' +name+ '</div>';
            newHTML +=                  '<div class="price notranslate">$' +parseFloat(price).toFixed(2)+ '</div>';
            newHTML +=              '</div>';
            newHTML +=          '</div>';
            newHTML +=      '</div>';
            newHTML += '</div>';
        }
        $(".muffin").html(newHTML);

        },
    });
}

function populateCookie() 
{
    $.ajax({
        type: "GET",
        url: "ServerPHP/serverGetRequests.php",
        data: {
        function: "getAllBaseProducts",
        group: "food",
        subgroup: "cookie",
        },
        success: function (response) {
        var res = JSON.parse(response);

        var newHTML = "";
        for (var key in res) 
        {
            var ind = res[key];
            var id = ind.id;
            var price = ind.price;
            var name = ind.name.split("_").join(" ");

            newHTML += '<div class="coffee-product" onclick=showFood(this) style="cursor: pointer;">';
            newHTML +=      '<div class="top-sp">';
            newHTML +=          '<div class ="img-cont">';
            newHTML +=              '<img src="../imgs/caramel_latte.png" alt="">';
            newHTML +=          '</div>';
            newHTML +=          '<div class ="prodName-cont">';
            newHTML +=              '<div class="product-label">';
            newHTML +=                  '<div class="productName" value="'+name+'">' +name+ '</div>';
            newHTML +=                  '<div class="price notranslate">$' +parseFloat(price).toFixed(2)+ '</div>';
            newHTML +=              '</div>';
            newHTML +=          '</div>';
            newHTML +=      '</div>';
            newHTML += '</div>';
        }
        $(".cookie").html(newHTML);

        },
    });
}

function populateMuffin() 
{
    $.ajax({
        type: "GET",
        url: "ServerPHP/serverGetRequests.php",
        data: {
        function: "getAllBaseProducts",
        group: "food",
        subgroup: "muffin",
        },
        success: function (response) {
        var res = JSON.parse(response);

        var newHTML = "";
        for (var key in res) 
        {
            var ind = res[key];
            var id = ind.id;
            var price = ind.price;
            var name = ind.name.split("_").join(" ");

            newHTML += '<div class="coffee-product" onclick=showFood(this) style="cursor: pointer;">';
            newHTML +=      '<div class="top-sp">';
            newHTML +=          '<div class ="img-cont">';
            newHTML +=              '<img src="../imgs/caramel_latte.png" alt="">';
            newHTML +=          '</div>';
            newHTML +=          '<div class ="prodName-cont">';
            newHTML +=              '<div class="product-label">';
            newHTML +=                  '<div class="productName" value="'+name+'">' +name+ '</div>';
            newHTML +=                  '<div class="price notranslate">$' +parseFloat(price).toFixed(2)+ '</div>';
            newHTML +=              '</div>';
            newHTML +=          '</div>';
            newHTML +=      '</div>';
            newHTML += '</div>';
        }
        $(".sandwich").html(newHTML);

        },
    });
}

function show(element) 
{
    document.getElementById('side-panel').style.visibility = "hidden";
    document.getElementById('side-panel-food').style.visibility = "hidden";

    productElement = element.getElementsByClassName("productName")[0];
    currentProduct = productElement.getAttribute("value");
    productPrice = element.getElementsByClassName("price")[0].innerHTML.substring(1);
    if(productElement.getElementsByTagName("font")[0] != undefined)
        displayName =productElement.getElementsByTagName("font")[0].getElementsByTagName("font")[0].innerHTML;
    else
        displayName = currentProduct;
    document.getElementById('side-panel').style.visibility = "visible";
    isFood = false;
}

function showFood(element) 
{
    productElement = element.getElementsByClassName("productName")[0];
    currentProduct = productElement.getAttribute("value");
    productPrice = element.getElementsByClassName("price")[0].innerHTML.substring(1);
    if(productElement.getElementsByTagName("font")[0] != undefined)
        displayName =productElement.getElementsByTagName("font")[0].getElementsByTagName("font")[0].innerHTML;
    else
        displayName = currentProduct;
    document.getElementById('side-panel-food').style.visibility = "visible";
    isFood = true;
}

function hide()
{
    document.getElementById('side-panel').style.visibility = "hidden";
    document.getElementById('side-panel-food').style.visibility = "hidden";

    var addOns = document.getElementsByClassName("addOnOption");
    // set each button to unchecked
    for(var i = 0; i < addOns.length; i++)
    {
        addOns[i].style.opacity = 1;
        // make each button unselected
        addOns[i].value = false;
    }

    var sizes = document.getElementsByClassName("size");
    for(var i = 0; i < sizes.length; i++)
    {
        sizes[i].style.opacity = 1;
        sizes[i].value = false;
    }
}

function clickHandler(element) 
{
    var parent = element.parentNode;
    var buttons = parent.getElementsByClassName("size");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].value = false;
    }
    // set the clicked button to true
    element.value = true;
  
    // invert colors
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].value == "true") {
        buttons[i].style.opacity = .5;
      } else {
        buttons[i].style.opacity = 1;
      }
    }
}

function clickAddOnHandler(element) 
{
    if (element.value == "true") 
    {
        element.style.opacity = 1;
        element.value = "false";
    } 
    else 
    {
        element.style.opacity = .5;
        element.value = "true";
    }
}

// function googleTranslateElementInit() 
// {
//     new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
// }

function addToCart()
{
    addHelper();
}

function addHelper() 
{
    var size = "";
    var sizeDisplay = "";
    var buttons = document.getElementsByClassName("size");
    for (var i = 0; i < buttons.length; i++) 
    {
      if (buttons[i].value == "true") 
      {
        size = buttons[i].getAttribute("input");
        if(buttons[i].getElementsByTagName("font")[0] != undefined)
          sizeDisplay = buttons[i].getElementsByTagName("font")[0].getElementsByTagName("font")[0].innerHTML;
        else
          sizeDisplay = size;
      }
    }
  
    productPrice2 = parseFloat(productPrice);
  
    if (size == "Tall") {
      productPrice2 = productPrice2 + 0.5;
    } else if (size == "Grande") {
      productPrice2 = productPrice2 + 1.0;
    } else if (size == "Venti") {
      productPrice2 = productPrice2 + 1.5;
    } else if (size == "Trenta") {
      productPrice2 = productPrice2 + 2.0;
    }
  
    productPrice2 = productPrice2.toFixed(2);
    productPrice2 = "$" + productPrice2;
  
    if (size == "") 
    {
      alert("Please select a customization");
      return;
    }

    var addOns = [];
    var addOnsDisplay = [];
    var addOnButtons = document.getElementsByClassName("addOnOption");

    if(!isFood)
    {
        for (var i = 0; i < addOnButtons.length; i++) 
        {
            if (addOnButtons[i].value == "true") 
            {
                addOns.push(addOnButtons[i].getAttribute("input"));
                if(addOnButtons[i].getElementsByTagName("font")[0] != undefined)
                    addOnsDisplay.push(addOnButtons[i].getElementsByTagName("font")[0].getElementsByTagName("font")[0].innerHTML);
                else
                    addOnsDisplay.push(addOnButtons[i].getAttribute("input"));
            }
        }
        addOns.sort();
    }
  
    // if add ons is empty, add an empty string
    if (addOns.length == 0) {
      addOns.push("");
    }
    
    var product = {
      productName: currentProduct,
      displayName: displayName,
      price: productPrice2,
      size: size,
      sizeDisplay: sizeDisplay,
      addOns: addOns,
      addOnsDisplay: addOnsDisplay
    };
    cart.push(product);
    repopulateCart();
    hide();
}

function deleteFromCart(element) 
{
  var parent = element.parentNode;
  var value = parent.getAttribute("value");

  cart.splice(value, 1);
  
  repopulateCart();
}

function repopulateCart() 
{
    $(".cart-panel").html("");
    var totalPrice = 0;
  
    for (var i = 0; i < cart.length; i++) {
      var item = cart[i];
      var productName = item.productName;
      var displayName = item.displayName;
      var price = item.price.replace("$", "");
      var addOns = item.addOns;
      var addOnsDisplay = item.addOnsDisplay;
      var size = item.size;
      var sizeDisplay = item.sizeDisplay;
  
      var newHTML = '<div class="cart-item notranslate" value='+i+'>';
      newHTML +=
        '<div class="productName notranslate" translate = "yes" value=\'' +
        productName +
        "'>" +
        displayName +
        "&nbsp;</div>";
      newHTML += '<span class="price notranslate">$' + price + "</span>";
      newHTML +=
        "<button class=\"delete notranslate\" onclick='deleteFromCart(this)'>X</button>";
      newHTML += "<div class='size notranslate'>";
      newHTML += sizeDisplay + "</div>";
      newHTML += "<div class='addOns notranslate'>";
  
      // check if addons is undefined
      if (addOns != undefined && addOns.length > 0 && addOns[0] != "") {
        for (var j = 0; j < addOns.length; j++) {
          newHTML += addOnsDisplay[j] + ", ";
        }
        newHTML = newHTML.substring(0, newHTML.length - 2);
      }
  
      newHTML += "</div>";
      newHTML += "</div>";
  
      $(".cart-panel").append(newHTML);
      totalPrice += parseFloat(price);
    }
  
    $(".price-total").html("$" + totalPrice.toFixed(2));
}

function confirmationClick() 
{
    var finishedProductsArray = cart;
    var customerName = $(".customerName").val();
    var employeeID = serverID;

    if (customerName == "")
    {
        alert("Please enter a name");
        return;
    }
    else if(finishedProductsArray.length == 0)
    {
        alert("Please add items to the cart");
        return;
    }

    console.log(finishedProductsArray);

    $.ajax({
        type: "POST",
        url: "ServerPHP/serverPostRequests.php",
        data: {
        function: "updateDatabase",
        customerName: customerName,
        employeeID: employeeID,
        finishedProductsArray: finishedProductsArray,
        },
        success: function (response) {
            console.log(response);
            alert("Order placed!");
            resetPage();
            $(".customerName").val("");
        },
    });
}

// window onload
window.onload = function() {
  // get current stylesheet from localstorage
  var currentStylesheet = localStorage.getItem('stylesheet');
  if (currentStylesheet) {
      changeFunc(currentStylesheet);
      var select = document.getElementById('selectStylesheet');
      select.value = currentStylesheet;
  }
  else
  {
      changeFunc('default');
      localStorage.setItem('stylesheet', 'default');
  }

}


function changeFunc(value) 
{
  link = document.getElementById("secondaryStyleSheet"); //Fetch the link by its ID
  if(value == 'default')
    link.setAttribute("href", "../css/customer.css");
  else
    link.setAttribute("href", value+".css"); //Change its href attribute

  // store current stylesheet in localstorage
  localStorage.setItem('stylesheet', value);
}

var ids = [];
for(var i = 1; i <= 14; i++)
  ids.push(i+"");

// text size change functionality
function small(){
    document.getElementById('content').style.fontSize = "0.7em";
    document.getElementById('confirm').style.fontSize = "1em";
    document.getElementById('name').style.fontSize = "0.7em";

    for(var i = 0; i < ids.length; i++)
    {
      document.getElementById(ids[i]).style.fontSize = "0.7em";
    }
  }
  
  function original(){
    document.getElementById('content').style.fontSize = "initial";
    document.getElementById('confirm').style.fontSize = "1.7em";
    document.getElementById('name').style.fontSize = "initial";

    for(var i = 0; i < ids.length; i++)
    {
      document.getElementById(ids[i]).style.fontSize = "initial";
    }
  }
  
  function medium(){
    document.getElementById('content').style.fontSize = "1.25em";
    document.getElementById('confirm').style.fontSize = "1.8em";
    document.getElementById('name').style.fontSize = "1.25em";

    for(var i = 0; i < ids.length; i++)
    {
      document.getElementById(ids[i]).style.fontSize = "1.25em";
    }

  }
  
  function large(){
    document.getElementById('content').style.fontSize = "1.5em";
    document.getElementById('confirm').style.fontSize = "1.9em";
    document.getElementById('name').style.fontSize = "1.5em";
  
    for(var i = 0; i < ids.length; i++)
    {
      document.getElementById(ids[i]).style.fontSize = "1.5em";
    }
  }
  
  function larger(){
    document.getElementById('content').style.fontSize = "2em";
    document.getElementById('confirm').style.fontSize = "2em";
    document.getElementById('name').style.fontSize = "2em";

    for(var i = 0; i < ids.length; i++)
    {
      document.getElementById(ids[i]).style.fontSize = "2em";
    }
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
      localStorage.setItem('fontSize', value.toString());
  }

  window.onload = function(){
    //retrieve previous font size
    var fontSize = localStorage.getItem('fontSize');
  
    //set the selector font size to the correct font size
    document.getElementById('fontSizes').value=fontSize;
  
    // Convert the String back to a function
    var myFunc = eval('(' + fontSize + ')');
  
    // Use it
    myFunc();
  }
