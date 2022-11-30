$(document).ready(function () 
{
    $("#navbar").load("managerNavbar.html");
    // get current stylesheet from localstorage
    var currentStylesheet = localStorage.getItem('stylesheet');
    if (currentStylesheet) {
        changeFunc(currentStylesheet);
        var select = document.getElementById('selectStylesheet');
        select.value = currentStylesheet;
    }
    else
    {
        localStorage.setItem('stylesheet', "default");
        changeFunc("default");
    }
});

function googleTranslateElementInit() 
{
    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}

function changeFunc(value) 
{
    link = document.getElementById("secondaryStyleSheet"); //Fetch the link by its ID
    link.setAttribute("href", value+".css"); //Change its href attribute

    // store current stylesheet in localstorage
    localStorage.setItem('stylesheet', value);
}

// text size change functionality
function small(){
    document.getElementById('content').style.fontSize = "0.7em";
  }
  
  function original(){
    document.getElementById('content').style.fontSize = "initial";
  }
  
  function medium(){
    document.getElementById('content').style.fontSize = "1.25em";
  }
  
  function large(){
    document.getElementById('content').style.fontSize = "1.5em";
  
  }
  
  function larger(){
    document.getElementById('content').style.fontSize = "2em";
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
  }
