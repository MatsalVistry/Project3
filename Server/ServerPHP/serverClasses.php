<?php

class AddOn
{
    // member variables
    public $id;
    public $name;

    // constructor
    function __construct($id, $name)
    {
        $this->id = $id;
        $this->name = $name;
    }
}

class BaseProduct
{
    // member variables
    public $id;
    public $name;
    public $price;
    public $group;
    public $subgroup;
    public $count;

    // constructor
    function __construct($id, $name, $price, $group, $subgroup, $count)
    {
        $this->id = $id;
        $this->name = $name;
        $this->price = $price;
        $this->group = $group;
        $this->subgroup = $subgroup;
        $this->count = $count;
    }
}

class Composition
{
    // member variables
    public $id;
    public $name;

    // constructor
    function __construct($id, $name)
    {
        $this->id = $id;
        $this->name = $name;
    }
}

class FinishedProduct
{
    // member variables
    public $size;
    public $baseProduct;
    public $addOns;

    // constructor
    function __construct($size, $baseProduct, $addOns)
    {
        $this->size = $size;
        $this->baseProduct = $baseProduct;
        $this->addOns = $addOns;
    }

    public function getTotalPrice()
    {
        $totalPrice = $this->baseProduct->price;
        switch ($this->size) {
            case "Tall":
                $totalPrice += 0.5;
                break;
            case "Grande":
                $totalPrice += 1;
                break;
            case "Venti":
                $totalPrice += 1.5;
                break;
            case "Trenta":
                $totalPrice += 2;
                break;
        }
        return $totalPrice;
    }
}

class Ingredient
{
    // member variables
    public $name;
    public $stockQuantity;

    // constructor
    function __construct($name, $stockQuantity)
    {
        $this->name = $name;
        $this->stockQuantity = $stockQuantity;
    }
}

class Pair
{
    // member variables
    public $str;
    public $count;
    public $name1;
    public $name2;

    // constructor
    function __construct($str, $count, $name1, $name2)
    {
        $this->str = $str;
        $this->count = $count;
        $this->name1 = $name1;
        $this->name2 = $name2;
    }
}
