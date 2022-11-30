<?php

// connecting to database
require_once("./../../Shared/SharedBackend/Credentials.php");
require_once("./serverFunctions.php");
require_once("./serverClasses.php");

// checking for corret request method
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    return;
}

switch ($_POST["function"]) {

    case "updateDatabase": // update database after placing orders

        $finishedProductsArray = $_POST["finishedProductsArray"];
        

        $finishedProducts = array();
        for ($i = 0; $i < count($finishedProductsArray); $i++) {
            $size = $finishedProductsArray[$i]["size"];
            $baseProduct = array();
            $productName = $finishedProductsArray[$i]["productName"];
            // replace spaces with underscores in productname
            $productName = str_replace(" ", "_", $productName);
            // grab data from database for base product based on name
            $statement = "SELECT * FROM Base_Product WHERE Base_Product_Name = '" . $productName . "';";


            $result = pg_query($connect, $statement);
            $row = pg_fetch_array($result);
            $id = $row['base_product_id'];
            $name = $row['base_product_name'];
            $price = $row['base_product_price_each'];
            $group = $row['product_group'];
            $subgroup = $row['product_subgroup'];

            $baseProduct = new BaseProduct($id, $name, $price, $group, $subgroup, 1);

            $addOns = array();

            for ($j = 0; $j < count($finishedProductsArray[$i]["addOns"]); $j++) {
                $addOn = $finishedProductsArray[$i]["addOns"][$j];
                // if addOn is an empty string, skip it
                if ($addOn == "") {
                    continue;
                }
                $addOn = str_replace(" ", "_", $addOn);
                // if name is Whip change to Whipped_Cream
                if ($addOn == "Whip") {
                    $addOn = "Whipped_Cream";
                }
                if ($addOn == "Caramel") {
                    $addOn = "Caramel_Drizzle";
                }

                // query database for addOn to grab id
                $statement = "SELECT * FROM Add_ons WHERE Ingredient_Name = '" . $addOn . "';";
                $result = pg_query($connect, $statement);

                $row = pg_fetch_array($result);
                $id = $row["add_on_id"];
                array_push($addOns, new AddOn($id, $addOn));
            }

            $finishedProduct = new FinishedProduct($size, $baseProduct, $addOns);
            array_push($finishedProducts, $finishedProduct);
        }
        $customerName = $_POST["customerName"];
        $employeeID = $_POST["employeeID"];

        if (!isset($finishedProductsArray) || !isset($customerName) || !isset($employeeID)) {
            return;
        }

        updateDatabase($connect, $finishedProducts, $customerName, $employeeID);
        break;

    default:
        return;
}
