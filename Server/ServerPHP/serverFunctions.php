<?php

require_once("./serverClasses.php");

function getAllGroups($connect)
{
    $statement = "SELECT DISTINCT Product_Group FROM Base_Product;";
    $result = pg_query($connect, $statement);

    $groups = array();
    while ($row = pg_fetch_array($result)) {
        array_push($groups, $row);
    }

    echo json_encode($groups);
}

function getAllSubgroups($connect, $group)
{
    $statement = "SELECT DISTINCT Product_Subgroup FROM Base_Product WHERE Product_Group='" . $group . "';";
    $result = pg_query($connect, $statement);

    $subgroups = array();
    while ($row = pg_fetch_array($result)) {
        array_push($subgroups, $row);
    }

    echo json_encode($subgroups);
}

function getAllBaseProducts($connect, $group, $subgroup)
{
    $statement = "SELECT * FROM Base_Product WHERE Product_Group='" . $group . "' AND Product_Subgroup='" . $subgroup . "';";
    $result = pg_query($connect, $statement);

    $baseProducts = array();
    while ($row = pg_fetch_array($result)) {
        $baseProduct = array();
        $baseProduct["id"] = $row["base_product_id"];
        $baseProduct["price"] = $row["base_product_price_each"];
        $baseProduct["name"] = $row["base_product_name"];
        array_push($baseProducts, $baseProduct);
    }

    echo json_encode($baseProducts);
}

function getAllAddOns($connect)
{
    $statement = "SELECT * FROM Add_ons;";
    $result = pg_query($connect, $statement);

    $addOns = array();
    while ($row = pg_fetch_array($result)) {
        $addOn = array();
        $addOn["id"] = $row["add_on_id"];
        $addOn["name"] = $row["ingredient_name"];
        array_push($addOns, $addOn);
    }

    echo json_encode($addOns);
}

function calculateTotalPrice($finishedProductsArray)
{
    // check for empty input
    if (sizeof($finishedProductsArray) == 0) {
        return 0;
    }
    $totalPrice = 0;
    foreach ($finishedProductsArray as $finishedProduct) {
        $totalPrice += $finishedProduct->getTotalPrice();
    }
    return $totalPrice;
}

function getRandomPaymentType()
{
    $paymentTypes = array("credit_card", "debit_card", "gift_card", "cash");
    $randomIndex = rand(0, sizeof($paymentTypes) - 1);
    $randomPaymentType = $paymentTypes[$randomIndex];
    return $randomPaymentType;
}

function updateCustomerOrders($connect, $customerName, $randomPaymentType, $currentDate, $totalPrice, $employeeID)
{
    $statement = "INSERT INTO Customer_Orders (Customer_Name, Payment_Method, Order_Date, Order_Total_Price, Employee_ID) VALUES ";
    $statement .= "('" . $customerName . "', '" . $randomPaymentType . "', '" . $currentDate . "', " . $totalPrice . ", " . $employeeID . ");";
    pg_query($connect, $statement);
}

function getOrderID($connect)
{
    $statement = "SELECT MAX(Order_ID) FROM Customer_Orders;";
    $result = pg_query($connect, $statement);
    $row = pg_fetch_array($result);
    $orderID = $row["max"];
    return $orderID;
}

function updateCustomerOrdersCustomizedProductsJoiner($connect, $finishedProductsArray, $orderID)
{
    $statement = "INSERT INTO Customer_Orders_Customized_Products_joiner (Order_ID, Base_Product_ID, Add_on_ID) VALUES ";
    foreach ($finishedProductsArray as $finishedProduct) {
        $addOnIDs = "ARRAY [";
        foreach ($finishedProduct->addOns as $addOn) {
            $addOnIDs .= $addOn->id . ",";
        }
        if (substr($addOnIDs, -1) == ",") {
            $addOnIDs = substr($addOnIDs, 0, -1);
        }
        rtrim($addOnIDs, ", ");
        $addOnIDs .= "]::integer[]";
        $statement .= "(" . $orderID . ", " . $finishedProduct->baseProduct->id . "," . $addOnIDs . "), ";
    }
    if (substr($statement, -2) == ", ") {
        $statement = substr($statement, 0, -2);
    }
    $statement .= ";";
    pg_query($connect, $statement);
}

function updateInventory($connect, $finishedProductsArray)
{
    $ingredientsToDecrement = array();
    foreach ($finishedProductsArray as $finishedProduct) {
        // find all ingredients for a product from product_ingredient_joiner
        $statement = "SELECT Ingredient_Name FROM Product_Ingredient_Joiner WHERE Base_Product_ID = " . $finishedProduct->baseProduct->id . ";";
        $result = pg_query($connect, $statement);

        while ($row = pg_fetch_array($result)) {
            $ingredientName = $row["ingredient_name"];
            $numToDecrement = ($ingredientsToDecrement[$ingredientName] ?? 0) + 1;
            $ingredientsToDecrement[$ingredientName] = $numToDecrement;
        }

        foreach ($finishedProduct->addOns as $addOn) {
            $ingredientName = $addOn->name;
            $numToDecrement = ($ingredientsToDecrement[$ingredientName] ?? 0) + 1;
            $ingredientsToDecrement[$ingredientName] = $numToDecrement;
        }
    }

    foreach ($ingredientsToDecrement as $ingredientName => $numToDecrement) {
        $statement = "UPDATE Ingredients SET Ingredient_Quantity_In_Stock = Ingredient_Quantity_In_Stock - " . $numToDecrement . " WHERE Ingredient_Name = '" . $ingredientName . "';";
        pg_query($connect, $statement);
    }
}

function updateDatabase($connect, $finishedProductsArray, $customerName, $employeeID)
{
    // check for empty input
    if (sizeof($finishedProductsArray) == 0) {
        return;
    }

    $randomPaymentType = getRandomPaymentType();
    $currentDate = date("Y-m-d");
    $totalPrice = calculateTotalPrice($finishedProductsArray);

    updateCustomerOrders($connect, $customerName, $randomPaymentType, $currentDate, $totalPrice, $employeeID);
    $orderID = getOrderID($connect);
    updateCustomerOrdersCustomizedProductsJoiner($connect, $finishedProductsArray, $orderID);
    updateInventory($connect, $finishedProductsArray);
}
