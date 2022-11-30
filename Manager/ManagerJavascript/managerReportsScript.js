$(document).ready(function() 
{
    clearSales();
    clearProductPairs();
    populateRestockReport();
    clearExcess();
});

$(".salesReportSubmit").click(function( event ) 
{
    event.preventDefault();
    populateSales();
});

$(".productPairsSubmit").click(function( event ) 
{
    event.preventDefault();
    populateProductPairs();
});

$(".excessSubmit").click(function( event ) 
{
    event.preventDefault();
    populateExcess();
});

function populateSales() 
{
    clearSales();
    var d1 = document.getElementById("sales_d1").value;
    var d2 = document.getElementById("sales_d2").value;
    
    $.ajax({
        type: "GET",
        url: "ManagerBackend/Reports.php",
        data: 
        {
            functionName: "getSalesReportTimeWindow",
            d1: d1,
            d2: d2
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
                // replace _ with space in name
                name = name.replace(/_/g, " ");
                var count = ind.count;
                row.innerHTML = "<td>"+id+"</td><td>"+name+"</td><td>"+count+"</td>";
                $('.productSalesReport').append(row);
            }
        }
    });
}

function populateProductPairs()
{
    clearProductPairs();
    var d1 = document.getElementById("pairs_d1").value;
    var d2 = document.getElementById("pairs_d2").value;
    
    $.ajax({
        type: "GET",
        url: "ManagerBackend/Reports.php",
        data: 
        {
            functionName: "getProductPairsReport",
            d1: d1,
            d2: d2
        },
        success: function(response) 
        {
            var res = JSON.parse(response);
            var x = 0;

            for(var key in res)
            {
                x++;
                var ind = res[key];
                var row = document.createElement('tr');
                var p1 = ind.firstName;
                var p2 = ind.secondName;
                p1 = p1.replace(/_/g, " ");
                p2 = p2.replace(/_/g, " ");

                var count = ind.count;
                row.innerHTML = "<td>"+x+"</td><td>"+p1+"</td><td>"+p2+"</td><td>"+count+"</td>";
                $('.productPairsReport').append(row);
            }
        }
    });
}

function populateRestockReport()
{
    $(".restockReport").html('');
    var row = document.createElement('tr');
    row.innerHTML = "<td>ID<\/d><td>Name</td>";
    $('.restockReport').append(row);

    $.ajax({
        type: "GET",
        url: "ManagerBackend/Reports.php",
        data: 
        {
            functionName: "getRestockReport",
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
                row.innerHTML = "<td>"+id+"</td><td>"+name+"</td>";
                $('.restockReport').append(row);
            }
        }
    });
}

function populateExcess()
{
    clearExcess();
    var date = document.getElementById("excessDate").value;
    
    $.ajax({
        type: "GET",
        url: "ManagerBackend/Reports.php",
        data: 
        {
            functionName: "getExcessReport",
            date: date,
        },
        success: function(response) 
        {
            var res = JSON.parse(response);
            console.log("res: " + res);

            for(var key in res)
            {
                var ind = res[key];
                console.log(key);
                var row = document.createElement('tr');
                var id = ind.id;
                var name = ind.name;
                name = name.replace(/_/g, " ");
                var percentage = ind.percentage;
                row.innerHTML = "<td>"+id+"</td><td>"+name+"</td><td>"+percentage+"</td>";
                $('.excessReport').append(row);
            }
        }
    });
}

function clearProductPairs()
{
    $(".productPairsReport").html('');
    var row = document.createElement('tr');
    row.innerHTML = "<td>ID<\/d><td>Product 1</td><td>Product 2</td><td>Count</td>";
    $('.productPairsReport').append(row);
}

function clearSales() 
{
    $(".productSalesReport").html('');
    var row = document.createElement('tr');
    row.innerHTML = "<td>ID</td><td>Item Name</td><td>Quantity</td>";
    $('.productSalesReport').append(row);
}

function clearExcess()
{
    $(".excessReport").html('');
    var row = document.createElement('tr');
    row.innerHTML = "<td>ID</td><td>Name</td><td>Percentage</td>";
    $('.excessReport').append(row);
}

// text size change functionality
function small(){
    document.getElementById('PSR').style.fontSize = "0.9em";
    document.getElementById('MSPP').style.fontSize = "0.9em";
    document.getElementById('RR').style.fontSize = "0.9em";
    document.getElementById('ER').style.fontSize = "0.9em";
    document.getElementById('sales_d1').style.fontSize = "0.9em";
    document.getElementById('sales_d2').style.fontSize = "0.9em"; 
    document.getElementById('pairs_d1').style.fontSize = "0.9em"; 
    document.getElementById('pairs_d2').style.fontSize = "0.9em"; 
    document.getElementById('excessDate').style.fontSize = "0.9em"; 
    document.getElementById('submit_1').style.fontSize = "0.9em"; 
    document.getElementById('submit_2').style.fontSize = "0.9em"; 
    document.getElementById('submit_3').style.fontSize = "0.9em"; 
    document.getElementById('SideBarNav').style.fontSize = "0.9em"; 
    // reports end
    document.getElementById('content').style.fontSize = "0.9em";
  }
  
  function original(){
    document.getElementById('PSR').style.fontSize = "initial";
    document.getElementById('MSPP').style.fontSize = "initial";
    document.getElementById('RR').style.fontSize = "initial";
    document.getElementById('ER').style.fontSize = "initial";
    document.getElementById('sales_d1').style.fontSize = "initial";
    document.getElementById('sales_d2').style.fontSize = "initial"; 
    document.getElementById('pairs_d1').style.fontSize = "initial"; 
    document.getElementById('pairs_d2').style.fontSize = "initial"; 
    document.getElementById('excessDate').style.fontSize = "initial"; 
    document.getElementById('submit_1').style.fontSize = "initial"; 
    document.getElementById('submit_2').style.fontSize = "initial"; 
    document.getElementById('submit_3').style.fontSize = "initial"; 
    document.getElementById('SideBarNav').style.fontSize = "initial"; 
    // reports end

  }
  
  function medium(){
    document.getElementById('PSR').style.fontSize = "1.2em";
    document.getElementById('MSPP').style.fontSize = "1.2em";
    document.getElementById('RR').style.fontSize = "1.2em";
    document.getElementById('ER').style.fontSize = "1.2em";
    document.getElementById('sales_d1').style.fontSize = "1.1em";
    document.getElementById('sales_d2').style.fontSize = "1.1em"; 
    document.getElementById('pairs_d1').style.fontSize = "1.1em"; 
    document.getElementById('pairs_d2').style.fontSize = "1.1em"; 
    document.getElementById('excessDate').style.fontSize = "1.1em"; 
    document.getElementById('submit_1').style.fontSize = "1.1em"; 
    document.getElementById('submit_2').style.fontSize = "1.1em"; 
    document.getElementById('submit_3').style.fontSize = "1.1em"; 
    document.getElementById('SideBarNav').style.fontSize = "1.1em"; 
// reports end
  }
  
  function large(){
    document.getElementById('PSR').style.fontSize = "1.3em";
    document.getElementById('MSPP').style.fontSize = "1.3em";
    document.getElementById('RR').style.fontSize = "1.3em";
    document.getElementById('ER').style.fontSize = "1.3em";
    document.getElementById('sales_d1').style.fontSize = "1.2em";
    document.getElementById('sales_d2').style.fontSize = "1.2em"; 
    document.getElementById('pairs_d1').style.fontSize = "1.2em"; 
    document.getElementById('pairs_d2').style.fontSize = "1.2em"; 
    document.getElementById('excessDate').style.fontSize = "1.2em"; 
    document.getElementById('submit_1').style.fontSize = "1.2em"; 
    document.getElementById('submit_2').style.fontSize = "1.2em"; 
    document.getElementById('submit_3').style.fontSize = "1.2em"; 
    document.getElementById('SideBarNav').style.fontSize = "1.2em"; 
// reports end
  
  }
  
  function larger(){
    document.getElementById('PSR').style.fontSize = "1.5em";
    document.getElementById('MSPP').style.fontSize = "1.5em";
    document.getElementById('RR').style.fontSize = "1.5em";
    document.getElementById('ER').style.fontSize = "1.5em";
    document.getElementById('sales_d1').style.fontSize = "1.3em";
    document.getElementById('sales_d2').style.fontSize = "1.3em"; 
    document.getElementById('pairs_d1').style.fontSize = "1.3em"; 
    document.getElementById('pairs_d2').style.fontSize = "1.3em"; 
    document.getElementById('excessDate').style.fontSize = "1.3em"; 
    document.getElementById('submit_1').style.fontSize = "1.3em"; 
    document.getElementById('submit_2').style.fontSize = "1.3em"; 
    document.getElementById('submit_3').style.fontSize = "1.3em"; 
    document.getElementById('SideBarNav').style.fontSize = "1.3em"; 
// reports end
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

    if(fontSize === null){
        fontSize = "original()";
    }
  
    //set the selector font size to the correct font size
    document.getElementById('fontSizes').value=fontSize;
    
    // Convert the String back to a function and calls the function
    var myFunc = eval('(' + fontSize + ')');
  }