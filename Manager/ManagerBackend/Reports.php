<?php
    require_once("./../../Shared/SharedBackend/Credentials.php");

    $is_get = $_SERVER['REQUEST_METHOD'] == 'GET';
    $is_post = $_SERVER['REQUEST_METHOD'] == 'POST';

    if($is_get)
    {
        if($_GET['functionName'] == "getRestockReport")
        {
            $statement = "SELECT DISTINCT j.Base_Product_ID, p.Base_Product_Name FROM ingredients as i INNER JOIN product_ingredient_joiner as j ON i.Ingredient_Name = j.Ingredient_Name INNER JOIN base_product as p ON p.Base_Product_ID = j.Base_Product_ID WHERE i.Ingredient_Quantity_In_Stock = 0 ORDER BY j.Base_Product_ID ASC ;";    
            $result = pg_query($connect, $statement);

            $products = array();

            while($row = pg_fetch_array($result))
            {
                $product = array();
                $product['id'] = $row['base_product_id'];
                $product['name'] = $row['base_product_name'];

                array_push($products, $product);
            }   

            echo json_encode($products);
        }
        else if($_GET['functionName'] == "getSalesReportTimeWindow")
        {
            $statement = "SELECT p.base_product_id, coalesce(temp.ct, 0 ), p.base_product_name FROM (SELECT j.base_product_id as pid, COUNT(j.base_product_id) as ct FROM customer_orders as o INNER JOIN customer_orders_customized_products_joiner as j ON o.order_id = j.order_id WHERE o.Order_Date BETWEEN '".$_GET['d1']."' AND '".$_GET['d2']."' GROUP BY j.base_product_id ) as temp RIGHT JOIN base_product as p ON p.base_product_id = temp.pid ORDER BY temp.pid ASC;";           
            $result = pg_query($connect, $statement);

            $products = array();

            while($row = pg_fetch_array($result))
            {
                $product = array();
                $product['id'] = $row['base_product_id'];
                $product['name'] = $row['base_product_name'];
                $product['count'] = $row['coalesce'];

                array_push($products, $product);
            }

            echo json_encode($products);
        }
        else if($_GET['functionName'] == "getExcessReport")
        {
            $excess = array();

            // sold products
            $soldProducts = array();
            $statement = "SELECT p.base_product_id, coalesce(temp.ct, 0 ), p.base_product_name FROM (SELECT j.base_product_id as pid, COUNT(j.base_product_id) as ct FROM customer_orders as o INNER JOIN customer_orders_customized_products_joiner as j ON o.order_id = j.order_id WHERE o.Order_Date > '".$_GET['date']."' GROUP BY j.base_product_id ) as temp RIGHT JOIN base_product as p ON p.base_product_id = temp.pid ORDER BY temp.pid ASC;";
            $result = pg_query($connect, $statement);

            while($row = pg_fetch_array($result))
            {
                $product = array();
                $product['id'] = $row['base_product_id'];
                $product['name'] = $row['base_product_name'];
                $product['count'] = $row['coalesce'];

                array_push($soldProducts, $product);
            }

            $productIngredientsMap = array();
            foreach($soldProducts as $product)
            {
                $productIngredientsMap[$product['id']] = array();
            }
            $statement = "SELECT * FROM product_ingredient_joiner;";
            $result = pg_query($connect, $statement);

            while($row = pg_fetch_array($result))
            {
                $id = $row['base_product_id'];
                $name = $row['ingredient_name'];
                array_push($productIngredientsMap[$id], $name);
            }

            $currentIngredientStock = array();
            $statement = "SELECT * FROM ingredients;";
            $result = pg_query($connect, $statement);

            while($row = pg_fetch_array($result))
            {
                $temp = array();
                $temp['name'] = $row['ingredient_name'];
                $temp['quantity'] = $row['ingredient_quantity_in_stock'];
                array_push($currentIngredientStock, $temp);
            }

            $totalIngredientQuantity = array();
            foreach($currentIngredientStock as $ingredient)
            {
                $totalIngredientQuantity[$ingredient['name']] = $ingredient['quantity'];
            }

            foreach($soldProducts as $product)
            {
                $id = $product['id'];
                $count = $product['count'];

                foreach($productIngredientsMap[$id] as $ingredient)
                {
                    $totalIngredientQuantity[$ingredient] = $totalIngredientQuantity[$ingredient] + $count;
                }
            }

            foreach($soldProducts as $product)
            {
                $possibleSales = PHP_INT_MAX;

                foreach($productIngredientsMap[$product['id']] as $ingredient)
                {
                    $possibleSales = min($possibleSales, $totalIngredientQuantity[$ingredient]);
                }

                $percentage = $product['count'] / $possibleSales * 100;
                $product['percentage'] = round($percentage * 100) / 100;

                if($possibleSales * .90 > $product['count'])
                {
                    array_push($excess, $product);
                }
            }

            echo json_encode($excess);
        }
        else if($_GET['functionName'] == "getProductPairsReport")
        {
            $statement = "SELECT o.Order_ID, j.Base_Product_ID, p.Base_Product_Name FROM Customer_Orders_Customized_Products_joiner as j INNER JOIN Customer_Orders as o ON j.Order_ID = o.Order_ID INNER JOIN Base_product as p ON j.Base_Product_ID = p.Base_Product_ID WHERE o.Order_Date BETWEEN '".$_GET['d1']."' AND '".$_GET['d2']."';";
            $result = pg_query($connect, $statement);

            $productIDNameMap = array();
            $orderIDProductIDMap = array();

            while($row = pg_fetch_array($result))
            {
                $orderID = $row['order_id'];
                $productID = $row['base_product_id'];
                $productName = $row['base_product_name'];

                if(!array_key_exists($orderID, $orderIDProductIDMap))
                {
                    $orderIDProductIDMap[$orderID] = array();
                }
                
                array_push($orderIDProductIDMap[$orderID], $productID);
                $productIDNameMap[$productID] = $productName;
            }

            $productPairs = array();
            foreach($orderIDProductIDMap as $orderID => $value)
            {
                $productIDs = $orderIDProductIDMap[$orderID];

                for($i = 0; $i < count($productIDs); $i++)
                {
                    for($j = $i + 1; $j < count($productIDs); $j++)
                    {
                        $productID1 = $productIDs[$i];
                        $productID2 = $productIDs[$j];

                        if($productID1 == $productID2)
                        {
                            continue;
                        }

                        $productPair = $productID1 < $productID2 ? $productID1 . " " . $productID2 : $productID2 . " " . $productID1;
                        array_push($productPairs, $productPair);
                    }
                }
            }

            $countPairs = array();

            foreach($productPairs as $productPair)
            {
                if(!array_key_exists($productPair, $countPairs))
                {
                    $countPairs[$productPair] = 0;
                }

                $countPairs[$productPair] = $countPairs[$productPair] + 1;
            }

            $arr = array();

            foreach($countPairs as $s => $value)
            {
                $firstHalf = substr($s, 0, strpos($s, " "));
                $secondHalf = substr($s, strpos($s, " ") + 1);

                $firstName = $productIDNameMap[$firstHalf];
                $secondName = $productIDNameMap[$secondHalf];

                $temp = array();
                $temp['name'] = $s;
                $temp['count'] = $countPairs[$s];
                $temp['firstName'] = $firstName;
                $temp['secondName'] = $secondName;
                array_push($arr, $temp);
            }

            usort($arr, function($a, $b) 
            {
                return $b['count'] - $a['count'];
            });

            echo json_encode($arr);
        }
    }
?>