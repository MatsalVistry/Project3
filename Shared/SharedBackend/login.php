<?php
    include_once './Credentials.php';

    $is_get = $_SERVER['REQUEST_METHOD'] == 'GET';
    $is_post = $_SERVER['REQUEST_METHOD'] == 'POST';

    if($is_get)
    {
        if($_GET['functionName'] == "checkLogin")
        {
            $statement = "SELECT * FROM Employees WHERE Email = '" .$_GET['email']. "' AND Password = '" .$_GET['password']."';";    
            $result = pg_query($connect, $statement);

            $valid = false;
            $row = pg_fetch_array($result);
            if($row)
            {
                $valid = true;
                $ret = array();
                $ret["valid"] = $valid;
                $ret["type"] = $row['type'];
                $ret["id"] = $row['employee_id'];
                echo json_encode($ret);
            }
            else
            {
                $valid = false;
                $ret = array();
                $ret["valid"] = $valid;
                $ret["type"] = "";
                $ret["id"] = "";
                echo json_encode($ret);
            }
        }
        else if($_GET['functionName'] == "checkLoginGoogle")
        {
            $statement = "SELECT * FROM Employees WHERE Email = '" .$_GET['email']. "';";    
            $result = pg_query($connect, $statement);

            $valid = false;
            $row = pg_fetch_array($result);
            if($row)
            {
                $valid = true;
                $ret = array();
                $ret["valid"] = $valid;
                $ret["type"] = $row['type'];
                $ret["id"] = $row['employee_id'];
                echo json_encode($ret);
            }
            else
            {
                $valid = false;
                $ret = array();
                $ret["valid"] = $valid;
                $ret["type"] = "";
                $ret["id"] = "";
                echo json_encode($ret);
            }
        }
    }
?>