<?php

// connecting to database
require_once("./../../Shared/SharedBackend/Credentials.php");
require_once("./serverFunctions.php");

// checking for corret request method
if ($_SERVER["REQUEST_METHOD"] != "GET") {
    return;
}

switch ($_GET["function"]) {

    case "getAllGroups": // retrieve all groups for display
        echo getAllGroups($connect);
        break;

    case "getAllSubgroups": // retrieve subgroups for display
        $group = $_GET["group"];
        echo getAllSubgroups($connect, $group);
        break;

    case "getAllBaseProducts": // retrieve all add-ons for display
        $group = $_GET["group"];
        $subgroup = $_GET["subgroup"];

        if (!isset($group) || !isset($subgroup)) {
            return;
        }

        getAllBaseProducts($connect, $group, $subgroup);
        break;

    case "getAllAddOns": // retrieve all add-ons for display
        getAllAddOns($connect);
        break;
        
    default:
        return;
}
