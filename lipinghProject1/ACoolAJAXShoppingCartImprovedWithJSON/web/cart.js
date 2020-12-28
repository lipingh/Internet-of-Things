// Timestamp of cart that page was last updated with
var lastCartUpdate = 0;

/*
 * Adds the specified item to the shopping cart, via Ajax call
 * itemCode - product code of the item to add
 */
function addToCart(itemCode) {

    var req = newXMLHttpRequest();

    req.onreadystatechange = getReadyStateHandler(req, updateCart);

    req.open("POST", "cart.do", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send("action=add&item=" + itemCode);
}

function deleteFromCart(itemCode) {

    var req = newXMLHttpRequest();

    req.onreadystatechange = getReadyStateHandler(req, updateCart);

    req.open("POST", "cart.do", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send("action=minus&item=" + itemCode);
}

/*
 * Update shopping-cart area of page to reflect contents of cart
 * described in JSON document.
 */
//change this function that can parse the json object 
//for the loop, change the method which can get property(name and quantity) for json foramt variales
function updateCart(cartJSON) {

    var cart = JSON.parse(cartJSON);
    var generated = cart.ShoppingCart.Generated;
    if (generated > lastCartUpdate) {
        lastCartUpdate = generated;
        var contents = document.getElementById("contents");
        contents.innerHTML = "";

        for (var I in cart.Itemlist) {

            var name = cart.Itemlist[I].Name;
            var quantity = cart.Itemlist[I].Quantity;

            var listItem = document.createElement("li");
            listItem.appendChild(document.createTextNode(name + " x " + quantity));
            contents.appendChild(listItem);
        }

    }

    document.getElementById("total").innerHTML = cart.ShoppingCart.Total;
}