function item(id, name, price)
{
    this.id = id;
    this.name =name;
    this.price = price;
}

//Create an array of items
var items = [];

items[0] = new item(1, "Office Buildings", 149.99);
items[1] = new item(2, "Healthcare Enviroments", 199.99);
items[2] = new item(3, "Education Buildings", 219.99);
items[3] = new item(4, "Homes", 149.99);

//function t o update the number of items in our shopping cart 
function updateCheckout()
{
    document.getElementById("cart-link").innerHTML = "Checkout (" + sessionStorage.length + ")";

}

//function to get the ID of the item
function getID(arg)
{
    var counter = 0;
    while( items[counter].name != arg)
    {
        counter++;
    }

    return items[counter].id;
}

//function to add items to shopping cart 
function add(arg)
{
    sessionStorage.setItem(items[arg].name, items[arg].price);
    updateCheckout();
}

//function to remove items from cart
function remove(arg)
{
    sessionStorage.removeItem(arg);
    displayCart(); // display remaining items in cart
    updateCheckout(); //update number of items in the cart
}

//function to display the cart 
function displayCart()
{
    var total = 0; // if we dont have anything in the cart its 0
    var output = "<table class='table table-hover'>";

    //check to see if the cart is empty
    if (sessionStorage.length == 0)
    {
        document.getElementById("cart").innerHTML = "<h3>Cart is empty!</h3>";
        document.getElementById("total").innerHTML = "<h3>TOTAL: " + total + "</h3>";

    }
    else 
    {
        output += "<tr><th>Image</th><th>Name</th><th>Price</th><th>Delete</th>"; //header row

        for(var x = 0; x < sessionStorage.length; x++)
        {
            var key = sessionStorage.key(x);
            output += "<tr><td><img src='images/img"+ getID(key)+ ".jpg' width='50px' height='50px'></td>"; //image of item
            output += "<td>" + key + "</td><td>" + sessionStorage.getItem(key) + "</td>"; //name of the and price item
            output += "<td><input type= 'button' class='btn btn-primary' value= 'Delete' onclick= 'remove(\""+ key + "\")'></td></tr>"; // get delete button and configure arg for remove function 
            total += parseFloat(sessionStorage.getItem(key));
        }

        //output
        document.getElementById("cart").innerHTML = output;
        document.getElementById("total").innerHTML = "<h3>TOTAL: " + total.toFixed(2) + "</h3>";
    }
}