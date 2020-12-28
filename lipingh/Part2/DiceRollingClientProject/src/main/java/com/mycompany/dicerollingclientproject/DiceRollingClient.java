/**
 * Follow the template from https://eclipse.org/paho/clients/java/
 */
package com.mycompany.dicerollingclientproject;

import java.util.Timer;
import java.util.TimerTask;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

public class DiceRollingClient extends TimerTask {
//define variables

    String topic = "/dice";
    int dice1, dice2;
    int qos = 1;
    String broker = "tcp://localhost:1883";
    String clientId = "lipingh_publisher";
    MemoryPersistence persistence = new MemoryPersistence();
    MqttClient client;
    MqttConnectOptions connOpts;

    /**
     * This is a constructor, which can connect to the mqtt once a new
     * DiceRollingClient object created
     */
    public DiceRollingClient() {
        try {
            client = new MqttClient(broker, clientId, persistence);
            connOpts = new MqttConnectOptions();
            connOpts.setCleanSession(true);
            System.out.println("Connecting to broker: " + broker);
            client.connect(connOpts);
            System.out.println("Connected");
        } catch (MqttException ex) {
            Logger.getLogger(DiceRollingClient.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * a override method to create and publish message to mqtt
     */
    public void run() {
        try {
            dice1 = (int) (Math.random() * 5) + 1;
            dice2 = (int) (Math.random() * 5) + 1;
            String content = "{\"Dice1\":" + dice1
                    + ",\"Dice2\":" + dice2 + "}";
            System.out.println("Publishing message: " + content);
            MqttMessage message = new MqttMessage(content.getBytes());
            message.setQos(qos);
            client.publish(topic, message);
        } catch (MqttException ex) {
            Logger.getLogger(DiceRollingClient.class.getName()).log(Level.SEVERE, null, ex);
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
        timer.schedule(new DiceRollingClient(), 0, 1000);
    }
}
