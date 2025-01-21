
const express =  require('express');
const amqp  =  require("amqplib");

const app = express();



app.use(express.json());

connectWithRabbitmq();

let channel , connection;


async function connectWithRabbitmq(){
    try {
        connection = await amqp.connect("amqp://localhost");
        // Create a channel
    channel = await connection.createChannel();
    channel.assertQueue("send_message");
    console.log('connected to rabbitmq server for user service')
    } catch (error) {
        console.log("somethng with wrong",error)
    }
}

 async function sendSignupNotification  (message)  {
    try {
      if (!channel) {
        console.error("RabbitMQ channel is not available");
        return;
      }
  
      // Send message to the queue
      channel.sendToQueue(
        "signup_notifications",
        Buffer.from(JSON.stringify(message))
      );
      console.log(`Message sent to queue: ${JSON.stringify(message)}`);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

app.post("/send-message", async(req,res)=>{
    await sendSignupNotification({
        userName:"Paras",
        age:24,
        timeStamp:Date.now()
    });
    res.status(200).json("success");
})


app.listen(3000,()=>{
    console.log("user server listening on port 3000")
});