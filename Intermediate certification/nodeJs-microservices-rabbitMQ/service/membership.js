/*
Membership Provider

Service that adds a membership information to a message
*/

var amqp = require('amqp');
var connect = require('../connect');

var config = connect.config;
var connection = connect.createConnection();
var MESSAGE_ORIGIN = 'nodejs-trace';


connection.on('error', function (e) {
  console.log('Error connecting the Membership Provider service', e);
});

// Wait for connection to become established.
connection.on('ready', function () {
  console.log('Connection ready');

  // Setup the exchange
  var exchange = connection.exchange(
    config.exchangeName
    , {type: 'fanout', durable: true, autoDelete: false, exclusive: false}
    , function (exchange) {
      console.log('Exchange ' + exchange.name + ' is open');
  });

  // Use the default 'amq.topic' exchange
  connection.queue(''
    , {exclusive: true, durable: true}
    , function (q) {
      console.log('Queue connected');
      // Catch all messages
      q.bind(exchange, '', function() {
        console.log('Waiting for membership on the '+ config.vhost + ' bus');
      });
      // Receive messages
      q.subscribe(function (message) {

        // transform data coming from messages generated by services written in other langs (eg. C# / Ruby)
        if(message.data) {
          message = JSON.parse(message.data.toString());
        }
        if(message.ttl <= 0) {
          return;
        }
        message.ttl--;
        if(!message.membershipId || (message.membershipId && message.membership_status)) {
          return;
        }

        message.membership_status = getMembership(message);

        console.log('********** MEMBERSHIP ***********', message);

        // Publish message back to the message broker
        exchange.publish('', message);  // '' = routing queue

      });
  });
});

var memberships = [
  'premium',
  'high',
  'regular',
  'low'
];
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var getMembership = function(message) {
  return memberships[ getRandomInt(0, 4) ];
}
