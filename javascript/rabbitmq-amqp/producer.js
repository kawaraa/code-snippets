import * as amqplib from "amqplib";
import UID from "../gateway_graphql/src/domain/helper/generate_id";

class RabbitMQMessageBroker {
  constructor() {}
  static connection;
  static channel;
  static queue = "test";
  static option = {
    // hostname: "rabbitmq.service.dev",
    // hostname: "amqp://localhost",
    username: "guest",
    password: "guest",
    exchange: "messages"
  };
  msg = "Hello World";

  static async dispatch(msg) {
    const connection = await amqplib.connect("amqp://localhost", this.option);
    const channel = await connection.createChannel();
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
        const id = UID.generate();
        const q = await channel.assertQueue("", { exclusive: true });
        await channel.consume(
          q.queue,
          request => {
            if (request.properties.correlationId == id) {
              const response = request.content.toString();
              resolve(response);
              console.log(" [.] Got %s", response);
              setTimeout(() => {
                channel.ack(request);
                connection.close();
                process.exit(0);
              }, 500);
            }
          },
          { noAck: true }
        );
        await channel.sendToQueue(this.queue, buffer, {
          correlationId: id,
          replyTo: q.queue
        });

        console.log(" [x] Sent %s", msg);
      } catch (error) {
        channel.close();
        process.exit(1);
        reject(error);
      }
    });
  }
}

export default RabbitMQMessageBroker;
