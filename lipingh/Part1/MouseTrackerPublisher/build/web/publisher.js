var loc = {'hostname': 'localhost', 'port': '8000'};
// Creates a client instance with a unique ID
client = new Paho.MQTT.Client(loc.hostname, Number(loc.port), 'lipingh_publisher');

// sets callback handlers
client.onConnectionLost = onConnectionLost;

// connects the client
client.connect({onSuccess: onConnect});

// called to send coordinates
function transmit(msg) {
    message = new Paho.MQTT.Message(msg);
    message.destinationName = "/lisa";
    message.qos = 1;
    message.retained = true;
    client.send(message);
}

// called when the client connects
function onConnect() {
    console.log("Connection established");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}
//myFunction is to get the position(x and y) from the client
//and write the coor inside an HTML element with id = "demo"
function myFunction(e) {
    var x = e.clientX;
    var y = e.clientY;
    var coor = "Coordinates: (" + x + "," + y + ")";
    document.getElementById("demo").innerHTML = coor;
    //var msg = document.getElementById("demo");
    var message = '{"X":"' + x + '","Y":"' + y + '"}';
    transmit(message);
}
//clear Coordinates
function clearCoor() {
    document.getElementById("demo").innerHTML = "";
}