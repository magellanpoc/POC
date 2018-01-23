/*
 * Example implementations for Enterprise Integration Patterns 
 *
 * Simple example of Message Filter with RabbitMQ
 */
package com.eai.rabbitMq;
import com.rabbitmq.client.Channel;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class QueueSender {

    private final static String QUEUE_NAME = "eiaqueue";

    public static void main(String[] argv) throws java.io.IOException, TimeoutException {
        Rabbit rabbit = new Rabbit("localhost");
        Channel channel = rabbit.createChannel();

        rabbit.makeQueue(channel, QUEUE_NAME);
        sendMessage(channel, QUEUE_NAME, "Hello EIA!");

        channel.close();
        rabbit.close();
    }

    private static void sendMessage(Channel channel, String queueName, String message) throws IOException {
        channel.basicPublish("", queueName, null, message.getBytes());
        System.out.println(" [x] Sent '" + message + "'");
    }
}
