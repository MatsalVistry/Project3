<?php
    require_once("./../../Shared/SharedBackend/Credentials.php");

    $is_get = $_SERVER['REQUEST_METHOD'] == 'GET';
    $is_post = $_SERVER['REQUEST_METHOD'] == 'POST';

    if($is_get)
    {
        if($_GET['functionName'] == "getAllBaseProducts")
        {
            $statement = "SELECT * FROM Base_Product;";    
            $result = pg_query($connect, $statement);
    
            $products = array();
    
            while($row = pg_fetch_array($result))
            {
                $product = array();
                $product['id'] = $row['base_product_id'];
                $product['name'] = $row['base_product_name'];
                $product['price'] = $row['base_product_price_each'];
                $product['group'] = $row['product_group'];
                $product['subgroup'] = $row['product_subgroup'];
    
                array_push($products, $product);
            }
    
            echo json_encode($products);
        }
        if($_GET['functionName'] == "checkBaseProductExists")
        {
            $statement = "SELECT * FROM Base_Product WHERE base_product_name = '" . $_GET['name'] . "';";
            $result = pg_query($connect, $statement);
            $row = pg_fetch_array($result);
    
            echo $row ? "true" : "false";
        }
    }
    else if($is_post)
    {
        if($_POST['functionName'] == "addBaseProduct")
        {
            $statement = "INSERT INTO Base_Product (Base_Product_Name, Base_Product_Price_Each, product_group, product_subgroup) VALUES ";
            $statement .= "('" . $_POST['name'] . "', " . $_POST['price'] . ", '" . $_POST['group'] . "', '" . $_POST['subgroup'] . "');";
            pg_exec($connect, $statement);
            
        
            $statement = "SELECT Base_Product_ID FROM Base_Product WHERE Base_Product_Name = '" . $_POST['name'] . "';";
            $result = pg_query($connect, $statement);
            $row = pg_fetch_array($result);
            $id = $row['base_product_id'];
        
            foreach($_POST['ingredients'] as $ingredient)
            {
                $statement = "INSERT INTO Product_Ingredient_Joiner (Base_Product_ID, ingredient_name) VALUES ";
                $statement .= "(" . $id . ", '" . $ingredient . "');";
                pg_exec($connect, $statement);
            }
        }
        else if($_POST['functionName'] == "updateBaseProduct")
        {
            // uses name as unique identifier, aka cannot change the name, keeping name in the update for consistency with java
            $statement = "UPDATE Base_Product SET Base_Product_Price_Each = " . $_POST['price'] . " ";
            $statement .= " WHERE base_product_name = '" . $_POST['name'] . "';";
            pg_exec($connect, $statement);

            $statement = "SELECT Base_Product_ID FROM Base_Product WHERE Base_Product_Name = '" . $_POST['name'] . "';";
            $result = pg_query($connect, $statement);
            $row = pg_fetch_array($result);
            $id = $row['base_product_id'];
        
            $statement = "DELETE FROM Product_Ingredient_Joiner WHERE Base_Product_ID = " . $id . ";";
            pg_exec($connect, $statement);
        
            foreach($_POST['ingredients'] as $ingredient)
            {
                $statement = "INSERT INTO Product_Ingredient_Joiner (Base_Product_ID, ingredient_name) VALUES ";
                $statement .= "(" . $id . ", '" . $ingredient . "');";
                pg_exec($connect, $statement);
            }
        }
        
    }
?>