$(document).ready(function () {
  localStorage.setItem("isServer", false);
  localStorage.setItem("serverID", 11);
});

$(".loginButton").click(function (event) {
  event.preventDefault();
  verifyLogin();
});



// text size change functionality
function small(){
  document.getElementById('content').style.fontSize = "0.7em";
  document.getElementById('menu').style.fontSize = "0.7em";
  document.getElementById('email').style.fontSize = "0.7em";
  document.getElementById('password').style.fontSize = "0.7em";
  document.getElementById('login').style.fontSize = "0.7em";
  document.getElementById('buttonDiv').style.fontSize = "0.7em"; 
}

function original(){
  document.getElementById('content').style.fontSize = "initial";
  document.getElementById('menu').style.fontSize = "initial";
  document.getElementById('email').style.fontSize = "initial";
  document.getElementById('password').style.fontSize = "initial";
  document.getElementById('login').style.fontSize = "initial";
  document.getElementById('buttonDiv').style.fontSize = "initial"; 
}

function medium(){
  document.getElementById('content').style.fontSize = "1.25em";
  document.getElementById('menu').style.fontSize = "1.25em";
  document.getElementById('email').style.fontSize = "1.25em";
  document.getElementById('password').style.fontSize = "1.25em";
  document.getElementById('login').style.fontSize = "1.25em";
  document.getElementById('buttonDiv').style.fontSize = "1.25em"; 
}

function large(){
  document.getElementById('content').style.fontSize = "1.5em";
  document.getElementById('menu').style.fontSize = "1.5em";
  document.getElementById('email').style.fontSize = "1.5em";
  document.getElementById('password').style.fontSize = "1.5em";
  document.getElementById('login').style.fontSize = "1.5em";
  document.getElementById('buttonDiv').style.fontSize = "1.5em"; 

}

function larger(){
  document.getElementById('content').style.fontSize = "2em";
  document.getElementById('menu').style.fontSize = "2em";
  document.getElementById('email').style.fontSize = "2em";
  document.getElementById('password').style.fontSize = "2em";
  document.getElementById('login').style.fontSize = "2em";
  document.getElementById('buttonDiv').style.fontSize = "2em"; 
}

function customerMenu() {
  localStorage.setItem("isServer", false);
  localStorage.setItem("serverID", 11);
  window.location.href = "../Server/customer.html";
}

function showPassword() {
  var x = document.getElementById("password");
  if (x.type === "password") {
      x.type = "text";
  } else {
      x.type = "password";
  }
}

function verifyLogin() {
  var email = $(".email").val();
  var password = $(".password").val();

  $.ajax({
    type: "GET",
    url: "./SharedBackend/login.php",
    data: {
      functionName: "checkLogin",
      email: email,
      password: password,
    },
    success: function (response) {
      var json = JSON.parse(response);

      var valid = json.valid;
      var id = json.id;
      var type = json.type;

      if (valid && type == "cashier") {
        localStorage.setItem("isServer", true);
        localStorage.setItem("serverID", id);

        window.location.href = "../Server/customer.html";
      } else if (valid && type == "manager") {
        window.location.href = "../Manager/managerReports.html";
      }
    },
  });
}

// function googleTranslateElementInit() 
// {
//     new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
// }


function jwtDecode(t) 
{
    let token = {};
    token.raw = t;
    token.header = JSON.parse(window.atob(t.split('.')[0]));
    token.payload = JSON.parse(window.atob(t.split('.')[1]));
    return (token.payload)
}
function handleCredentialResponse(response) 
{
    const responsePayload = jwtDecode(response.credential);
    console.log(responsePayload);

    var email = responsePayload.email;

    $.ajax({
      type: "GET",
      url: "./SharedBackend/login.php",
      data: {
        functionName: "checkLoginGoogle",
        email: email,
      },
      success: function (response) {
        var json = JSON.parse(response);
  
        var valid = json.valid;
        var id = json.id;
        var type = json.type;
  
        if (valid && type == "cashier") 
        {
          localStorage.setItem("isServer", true);
          localStorage.setItem("serverID", id);
  
          window.location.href = "../Server/customer.html";
        } 
        else if (valid && type == "manager") 
        {
          window.location.href = "../Manager/managerReports.html";
        }
      },
    });

}

window.onload = function () 
{
    google.accounts.id.initialize({
        client_id: '1090263784824-avcj2jdsl6j0f7ebu9s1mhu82k5p7106.apps.googleusercontent.com',
        callback: handleCredentialResponse
    });
    
    // Display the One Tap prompt
    google.accounts.id.prompt();
    
    // Display the Sign In With Google Button
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: 'outline', size: 'large' }
    );

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
    link.setAttribute("href", "../css/login.css");
  else
    link.setAttribute("href", value+".css"); //Change its href attribute

  // store current stylesheet in localstorage
  localStorage.setItem('stylesheet', value);
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

  //set the selector font size to the correct font size
  document.getElementById('fontSizes').value=fontSize;

  // Convert the String back to a function
  var myFunc = eval('(' + fontSize + ')');

  // Use it
  myFunc();
}


