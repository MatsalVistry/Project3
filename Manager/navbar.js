// window onload
window.onload = function() {
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

    
}


function changeFunc(value) 
{
    link = document.getElementById("secondaryStyleSheet"); //Fetch the link by its ID
    link.setAttribute("href", value+".css"); //Change its href attribute

    // store current stylesheet in localstorage
    localStorage.setItem('stylesheet', value);
    
}