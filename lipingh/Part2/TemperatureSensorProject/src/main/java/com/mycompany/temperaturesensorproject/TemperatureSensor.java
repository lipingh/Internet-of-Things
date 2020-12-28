/**
 * Follow the template from https://eclipse.org/paho/clients/java/
 */
package com.mycompany.temperaturesensorproject;

import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

public class TemperatureSensor extends TimerTask {
//Define variables

    String topic1 = "temperature/pittsburgh/coldTemps";
    String topic2 = "temperature/pittsburgh/niceTemps";
    String topic3 = "temperature/pittsburgh/hotTemps";
    int temperature;
    int qos = 2;
    String broker = "tcp://localhost:1883";
    String clientId = "lipingh_publisher";
    MemoryPersistence persistence = new MemoryPersistence();
    MqttClient client;
    MqttConnectOptions connOpts;

    /**
     * This is a constructor, which can connect to the mqtt once a new
     * TemperatureSensor object created
     */
    public TemperatureSensor() {
        try {
            client = new MqttClient(broker, clientId, persistence);
            connOpts = new MqttConnectOptions();
            connOpts.setCleanSession(true);
            System.out.println("Connecting to broker: " + broker);
            client.connect(connOpts);
            System.out.println("Connected");
        } catch (MqttException ex) {
            Logger.getLogger(TemperatureSensor.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * a override method to create and publish message to mqtt
     */
    public void run() {
        try {
            temperature = (int) (Math.random() * 100);
            String content = "{\"msg\":" + temperature
                    + ",\"date\":\"" + new Date() + "\"}";
            System.out.println("Publishing message: " + temperature);
            MqttMessage message = new MqttMessage(content.getBytes());
            message.setQos(qos);
            if (temperature <= 45) {
                client.publish(topic1, message);
            } else if (temperature > 80) {
                client.publish(topic3, message);
            } else {
                client.publish(topic2, message);
            }
        } catch (MqttException ex) {
            Logger.getLogger(TemperatureSensor.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Time schedule
     *
     * @param args
     * @throws MqttException
     */
    public static void main(String[] args) throws MqttException {
        Timer timer = new Timer();
        timer.schedule(new TemperatureSensor(), 0, 5000);
    }
}
