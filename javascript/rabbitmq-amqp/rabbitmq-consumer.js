// this code is called Consumer which is the Receiver app

import * as amqplib from "amqplib";

export default class RabbitMQ {
  constructor() {}

  static queue = "test";
  static option = {
    hostname: "rabbitmq.service.dev",
    username: "guest",
    password: "guest",
    exchange: "messages"
  };

  static async getConnection() {
    return await amqplib.connect("amqp://localhost", this.option).then(con => con);
  }

  static async getChannel() {
    const channel = await this.getConnection().then(con => con.createChannel());
    await channel.assertQueue(this.queue, { durable: false });
    return channel;
  }

  static async consume() {
    let message;
    const ch = await this.getChannel();
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", this.queue);
    await ch.consume(this.queue, msg => {
      message = msg.content.toString();
      console.log(" [x] Received %s", msg.content.toString());
      ch.ack(msg);
    });
    return message;
  }
}

RabbitMQ.consume()
  .then(msg => console.log("Again\n", msg))
  .catch(err => console.log("Error:\n", err));
