
var loc = {'hostname': 'broker.hivemq.com', 'port': '8000'};
// Creates a client instance with a unique ID
client = new Paho.MQTT.Client(loc.hostname, Number(loc.port), 'lipingh_subscribe');
// sets callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
// connects the client
client.connect({onSuccess: onConnect});
// called when the client connects
function onConnect() {
    console.log("Connection established, subscribing to student/name");
    client.subscribe("student/name", {qos: 1});
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}
// called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
    var json = JSON.parse(message.payloadString);
    var messageLine = document.getElementById('messages');
    var newmsg = document.createElement("p");
    newmsg.innerHTML = "Name:" + json.name + ", URL:" + json.URL;
    messageLine.append(newmsg);
}



