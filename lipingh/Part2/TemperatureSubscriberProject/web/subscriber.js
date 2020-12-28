var lastTopic;
var loc = {'hostname': 'localhost', 'port': '8000'};
// Creates a client instance with a unique ID
client = new Paho.MQTT.Client(loc.hostname, Number(loc.port), 'lipingh_subscriber');

// sets callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connects the client
client.connect({onSuccess: onConnect});

// called afer the the client sucessfuly connects
function onConnect() {
    // Once a connection has been made, subscribes the checked one
    console.log("connection established, subscribing to /temperature/pittsburg");

    client.subscribe("temperature/pittsburgh/#", {qos: 2});
    lastTopic = "temperature/pittsburgh/#";
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
    document.getElementById("messages").innerHTML = "Date: " + json.date + " Temperature: " + json.msg;
}
//change topic
function chooseTopic() {
    if (document.getElementById("myForm").elements[0].checked) {
        client.unsubscribe(lastTopic);
        client.subscribe("temperature/pittsburgh/coldTemps", {qos: 2});
        lastTopic = "temperature/pittsburgh/coldTemps";
    } else if (document.getElementById("myForm").elements[1].checked) {
        client.unsubscribe(lastTopic);
        client.subscribe("temperature/pittsburgh/niceTemps", {qos: 2});
        lastTopic = "temperature/pittsburgh/niceTemps";
    } else if (document.getElementById("myForm").elements[2].checked) {
        client.unsubscribe(lastTopic);
        client.subscribe("temperature/pittsburgh/hotTemps", {qos: 2});
        lastTopic = "temperature/pittsburgh/hotTemps";
    } else if (document.getElementById("myForm").elements[3].checked) {
        client.unsubscribe(lastTopic);
        client.subscribe("temperature/pittsburgh/#", {qos: 2});
        lastTopic = "temperature/pittsburgh/#";
    }
}