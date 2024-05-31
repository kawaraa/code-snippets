// this code is called Producer or Publisher which is the sender app

import * as amqplib from "amqplib/callback_api";

amqplib.connect("amqp://localhost", (err, connection) => {
  if (err) throw err;

  connection.createChannel((err, channel) => {
    if (err) throw err;

    const queue = "hello";
    const msg = {
      greetings: "Hello World",
      user: "Ahmad"
    };

    channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
    console.log(" [x] Sent %s", msg);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  });
});
