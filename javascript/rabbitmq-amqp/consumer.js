import * as amqplib from "amqplib";

const todo = {
  task: "Testing create",
  priority: "high",
  status: "inprogress",
  id: UID.generate(),
  timestamp: Date.now()
};

export default class RabbitMQMessageBroker {
  constructor() {}

  static queue = "test";
  static option = {
    hostname: "rabbitmq.service.dev",
    username: "guest",
    password: "guest",
    exchange: "messages"
  };

  static async consume() {
    const connection = await amqplib.connect("amqp://localhost", this.option).then(con => con);
    const channel = await connection.createChannel();
    channel.prefetch(1); // the same for RPC exchange is possible to specify how many request should receive
    let message;
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", this.queue);

    /* ====== No exchange ======= */
    // await channel.assertQueue(this.queue, { durable: false });
    // await channel.consume(this.queue, request => {
    //   message = request.content.toString();
    //   console.log(" [x] Received %s", message);
    //   setTimeout(() => channel.ack(request), 5000);
    // });

    /* ====== using fanout exchangee ======= */
    // await channel.assertExchange("logs", "fanout", { durable: false }); // using fanout exchange
    // const q = await channel.assertQueue('', {exclusive: true })
    // await channel.bindQueue(q.queue, "logs", '');
    // await channel.consume(q.queue, msg => { });

    /* ====== using RPC exchange ======= */
    await channel.assertQueue(this.queue, { durable: false });
    await channel.consume(this.queue, request => {
      const message = request.content.toString();
      console.log(" [x] Received %s", message);
      const jsonMSG = JSON.stringify({ test: "hello from consumer" });
      const buffer = Buffer.from(jsonMSG);
      this.reply(request, channel, buffer);
      console.log(" [.] Responded with %s", jsonMSG);
    });

    return message;
  }

  static reply(request, channel, response) {
    channel.sendToQueue(request.properties.replyTo, response, {
      correlationId: request.properties.correlationId
    });
    setTimeout(() => channel.ack(request), 500);
  }
}

RabbitMQMessageBroker.consume()
  .then(() => console.log("Connected Successfully\n"))
  .catch(err => console.log("Error:\n", err));
