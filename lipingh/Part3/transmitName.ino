#include "MQTT.h"
int led1 = D0; // This is where your LED is plugged in. The other side goes to a resistor connected to GND.
int led2 = D7; // Instead of writing D7 over and over again, we'll write led2
String content = "{\"name\": \"Liping HUANG\",\"URL\":\"http://www.andrew.cmu.edu/user/lipingh\"}";

void callback(char* topic, byte* payload, unsigned int length);

// Initialize the MQTT client
MQTT client("broker.hivemq.com", 1883, callback);

//Define a callback function to initialize the MQTT client
void callback(char* topic, byte* payload, unsigned int length) {
    //define a array with length+1
    char p[length + 1];
  
//copy payload to p with "length" length
    memcpy(p, payload, length);
    //the last array value is null, mark the end
    p[length] = NULL;

    delay(1000);
}


void setup() {
     
  //set the on-board LED pin as output
    pinMode(led1, OUTPUT);
    pinMode(led2, OUTPUT);

    // Connect to server
    client.connect("lipingh");

    // publish the message with relative topic once connect
    if (client.isConnected()) {
        client.publish("student/name",content);
    }
}

void loop() {
  // set the LED on
  digitalWrite(led1, HIGH);
  digitalWrite(led2, HIGH);

  // wait for a second
  delay(1000);

  // set the LED off
  digitalWrite(led1, LOW);
  digitalWrite(led2, LOW);

  // Wait for 1 second
  delay(1000);

  // if still connect, repeat!
    if (client.isConnected())
        client.loop();
}
