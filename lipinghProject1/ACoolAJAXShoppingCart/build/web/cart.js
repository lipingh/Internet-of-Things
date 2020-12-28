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


/*
 * Update shopping-cart area of page to reflect contents of cart
 * get the cart contents including item name, quantity(diplay by name X quantity)
 * described in XML document.
 */
function updateCart(cartXML) {
    var cart = cartXML.getElementsByTagName("cart")[0];
    var generated = cart.getAttribute("generated");
    //update the cart to lastest generate one
    if (generated > lastCartUpdate) {
        lastCartUpdate = generated;
        var contents = document.getElementById("contents");
        contents.innerHTML = "";
        //use loop to get all the item property from the cart and format into name X quantity
        var items = cart.getElementsByTagName("item");
        for (var I = 0; I < items.length; I++) {

            var item = items[I];
            var name = item.getElementsByTagName("name")[0].firstChild.nodeValue;
            var quantity = item.getElementsByTagName("quantity")[0].firstChild.nodeValue;

            var listItem = document.createElement("li");
            listItem.appendChild(document.createTextNode(name + " x " + quantity));
            contents.appendChild(listItem);
        }

    }
    document.getElementById("total").innerHTML = cart.getAttribute("total");
}
