const amqp = require("amqplib");

async function sendMail() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const exchange = "mail_exchange";
    const routingKey = "send_mail";

    const message = {
      to: "shadathossain3500@gmail.com",
      from: "sh543132@gmail.com",
      title: "This is a frist mail",
      body: "Hello This is my frist RabiteMQ messaig code just see it now!",
    };

    await channel.assertExchange(exchange, "direct", { durable: false });
    await channel.assertQueue("mail_queue", { durable: false });

    await channel.bindQueue("mail_queue", exchange, routingKey);

    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
    console.log("Mail data was sent", message);

    setTimeout(() => {
      connection.close();
    }, 5000);
  } catch (error) {
    console.log(error);
  }
}

sendMail();
