/**
 * Note: most of the codes are follow the tempalte WebsocketChat Applciation
 */
//Sets initial variables
var wsocket;
var serviceLocation = "ws://" + document.location.host + document.location.pathname + "cartendpoint";
var cart;
var lastCartUpdate = 0;

//Connects to the server

function connectToCartserver() {
    //Opens a connection to the websocket
    wsocket = new WebSocket(serviceLocation);
    console.log(serviceLocation);
    wsocket.onopen = function () {
        wsocket.send("get,");
    };
    //Specifies what to do when a message arrives
    wsocket.onmessage = onMessageReceived;
}

//Method that specifies what to do when a message comes from the server
function onMessageReceived(evt) {
    //Parses JSON
//    var msg = JSON.parse(evt); // native API
    console.log(evt.data);
    updateCart(evt.data);
}


/**
 * send message to the server
 * @param {type} itemCode
 * @returns {undefined}
 */
function addToCart(itemCode) {
    //req.send("action=add&item=" + itemCode);
    //var CartAction={"Action":"add","itemCode":itemCode};
    wsocket.send("add," + itemCode);
}
/*
 * send message to the server
 * @param {type} itemCode
 * @returns {undefined}
 */
function deleteFromCart(itemCode) {
    wsocket.send("minus," + itemCode)
}

/*
 * Update shopping-cart area of page to reflect contents of cart
 * described in JSON document.
 *
 */
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
            if (name) {
                listItem.appendChild(document.createTextNode(name + " x " + quantity));
                contents.appendChild(listItem);
            }
        }

    }

    document.getElementById("total").innerHTML = cart.ShoppingCart.Total;
}