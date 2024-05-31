"use strict";
class RabbitMQMessageBrokerProvider {
  constructor(amqplib, config) {
    this.amqplib = amqplib;
    this.connection = null;
    this.channel = null;
    this.config = config;
  }

  async dispatch(msg, queue) {
    this.connection = await this.amqplib.connect(this.config).then((con) => con);
    this.channel = await connection.createChannel();
    const buffer = Buffer.from(JSON.stringify(msg));

    return new Promise(async (resolve, reject) => {
      try {
        /* ====== No exchange ======= */
        // await channel.assertQueue(this.queue, { durable: false });
        // return channel.sendToQueue(this.queue, buffer);

        /* ====== using fanout exchange ======= */
        // await channel.assertExchange("logs", "fanout", { durable: false }); // using fanout exchange
        // await channel.publish('logs', '', buffer);

        /* ====== using RPC exchangee ======= */
        const id = crypto.randomUUID();
        const q = await channel.assertQueue("", { exclusive: true });
        await channel.consume(
          q.queue,
          (request) => {
            if (request.properties.correlationId == id) {
              const response = JSON.parse(request.content.toString());
              resolve(response);
              console.log(" [.] Got\n", response);
              setTimeout(() => {
                channel.ack(request);
                connection.close();
              }, 500);
            }
          },
          { noAck: true }
        );
        await channel.sendToQueue(queue, buffer, { correlationId: id, replyTo: q.queue });

        console.log(" [x] Dispatched\n", msg);
      } catch (error) {
        channel.close();
        process.exit(1);
        reject(error);
      }
    });
  }
}

module.exports = RabbitMQMessageBrokerProvider;
