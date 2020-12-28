var loc = {'hostname': 'localhost', 'port': '8000'};
//Load google chart packages
google.charts.load('current', {'packages': ['corechart', 'line', 'gauge']});
//Calls function when the packages are corrected loaded
google.charts.setOnLoadCallback(drawCharts);
//Sets variables
var json;
var dice1 = 0;
var dice2 = 0;
var sum = 0;
var total = 0;
var sumAverage = 0;
var sumArray = [];
var frequency = [13];
var data1, data2, data3;
var chart1, chart2, chart3;
var options1, options2, options3;
// Creates a client instance with a unique ID
client = new Paho.MQTT.Client(loc.hostname, Number(loc.port), 'lipingh_subscribe');
// sets callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
// connects the client
client.connect({onSuccess: onConnect});
// called when the client connects
function onConnect() {
    console.log("Connection established, subscribing to /dice");
    client.subscribe("/dice", {qos: 1});
    //drawCharts();
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
    json = JSON.parse(message.payloadString);
    dice1 = parseInt(json.Dice1);
    dice2 = parseInt(json.Dice2);
    sum = dice1 + dice2;
    //push the new sum to the sum array
    sumArray.push(sum)
    //get the total for current sumArray
    total = sumArray.reduce(function (a, b) {
        return a + b;
    }, 0);
    //get the sum Average
    sumAverage = total / sumArray.length;

    for (var i = 0; i < sumArray.length; i++) {
        var num = sumArray[i];
    }
    frequency[num] = frequency[num] ? frequency[num] + 1 : 1;

    updateChart();
}
//update the chart
function updateChart() {
    //set chart1 data values and draw a new one
    data1.setValue(0, 1, dice1);
    data1.setValue(1, 1, dice2);
    chart1 = new google.visualization.Gauge(document.getElementById('chart_1'));
    chart1.draw(data1, options1);
//set chart2 data values and draw a new one
    data2.setValue(0, 1, sum);
    data2.setValue(1, 1, sumAverage);
    chart2 = new google.visualization.Gauge(document.getElementById('chart_2'));
    chart2.draw(data2, options2);
//set chart3 data values and draw a new one
    data3.setValue(0, 1, frequency[2] / sumArray.length);
    data3.setValue(1, 1, frequency[3] / sumArray.length);
    data3.setValue(2, 1, frequency[4] / sumArray.length);
    data3.setValue(3, 1, frequency[5] / sumArray.length);
    data3.setValue(4, 1, frequency[6] / sumArray.length);
    data3.setValue(5, 1, frequency[7] / sumArray.length);
    data3.setValue(6, 1, frequency[8] / sumArray.length);
    data3.setValue(7, 1, frequency[9] / sumArray.length);
    data3.setValue(8, 1, frequency[10] / sumArray.length);
    data3.setValue(9, 1, frequency[11] / sumArray.length);
    data3.setValue(10, 1, frequency[12] / sumArray.length);
    chart3.draw(data3, options3);
}
//draw charts with datas and options
function drawCharts() {
    data1 = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Dice1', 0],
        ['Dice2', 0]
    ]);

    options1 = {
        width: 300, heigt: 80,
        min: 0, max: 6,
        minorTicks: 2
    };
    chart1 = new google.visualization.Gauge(document.getElementById('chart_1'));
    chart1.draw(data1, options1);

    data2 = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Sum', 0],
        ['Average', 0]
    ]);

    options2 = {
        width: 300, heigt: 80,
        min: 0, max: 12,
        minorTicks: 2
    };
    chart2 = new google.visualization.Gauge(document.getElementById('chart_2'));
    chart2.draw(data2, options2);

    data3 = new google.visualization.DataTable();
    data3.addColumn('number', 'X');
    data3.addColumn('number', 'Proportion');
    data3.addRows([[2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0]]);
    options3 = {
        width: 450, height: 250,
        hAxis: {
            title: 'Sum',
            viewWindow: {
                max: 12,
                min: 2
            },
            gridlines: {count: 11},
        },
        vAxis: {
            title: 'Proportion',
        }
    };
    chart3 = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart3.draw(data3, options3);

}