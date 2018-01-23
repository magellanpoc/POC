/*
 * Example implementations for Enterprise Integration Patterns
 *
 * Simple example of Message Filter with RabbitMQ
 */

package com.eai.rabbitMq;
import com.rabbitmq.client.Channel;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class ExchangeSender {
    
    private static final String EXCHANGE_NAME = "quote";

    public static void main(String[] argv) throws java.io.IOException, TimeoutException {
        Rabbit rabbit = new Rabbit("localhost");
        Channel channel = rabbit.createChannel();

        channel.exchangeDeclare(EXCHANGE_NAME, "direct");

        sendMessage(channel, EXCHANGE_NAME, "Widget", "Hello EIA Widget!");
        sendMessage(channel, EXCHANGE_NAME, "Gadget", "Hello EIA Gadget!");

        channel.close();
        rabbit.close();
    }

    private static void sendMessage(Channel channel, String exchange, String key, String message) throws IOException {
        channel.basicPublish(exchange, key, null, message.getBytes());
        System.out.println(" [x] Sent '" + message + "'");
    }

}
