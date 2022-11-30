<?php
    require_once("./../../Shared/SharedBackend/Credentials.php");

    $is_get = $_SERVER['REQUEST_METHOD'] == 'GET';
    $is_post = $_SERVER['REQUEST_METHOD'] == 'POST';

    if($is_get)
    {
        if($_GET['functionName'] == "getAllIngredients")
        {
            $statement = "SELECT * FROM ingredients;";    
            $result = pg_query($connect, $statement);
        
            $ingredients = array();
        
            while($row = pg_fetch_array($result))
            {
                $ingredient = array();
                $ingredient['name'] = $row['ingredient_name'];
                $ingredient['quantity'] = $row['ingredient_quantity_in_stock'];
        
                array_push($ingredients, $ingredient);
            }
        
            echo json_encode($ingredients);
        }
        if($_GET['functionName'] == "checkIngredientExists")
        {
            $statement = "SELECT * FROM ingredients WHERE ingredient_name = '" . $_GET['name'] . "';";
            $result = pg_query($connect, $statement);
            $row = pg_fetch_array($result);
        
            echo $row ? "true" : "false";
        }
    }
    else if($is_post)
    {
        if($_POST['functionName'] == "addIngredient")
        {
            $name = $_POST['name'];
            $quantity = $_POST['quantity'];
        
            $statement = "INSERT INTO ingredients (ingredient_name, ingredient_quantity_in_stock) VALUES ('$name', '$quantity');";
            pg_exec($connect, $statement);    
        }
        if($_POST['functionName'] == "updateIngredientQuantity")
        {
            $name = $_POST['name'];
            $quantity = $_POST['quantity'];
        
            $statement = "UPDATE ingredients SET ingredient_quantity_in_stock = '$quantity' WHERE ingredient_name = '$name';";
            pg_exec($connect, $statement);
        }
    }
?>