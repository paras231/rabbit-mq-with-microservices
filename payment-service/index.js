
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
    channel.assertQueue("signup_notifications");
    consumeMessages();
    console.log('connected to rabbitmq server for payment service')
    } catch (error) {
        console.log("somethng with wrong",error)
    }
}

function consumeMessages() {
    try {
      if (!channel) {
        console.error("RabbitMQ channel is not available for consuming");
        return;
      }
  
      console.log("Waiting for messages in the 'signup_notifications' queue...");
  
      channel.consume("signup_notifications", (msg) => {
        if (msg !== null) {
          const messageContent = msg.content.toString();
          console.log("Received message:", messageContent);
  
          // Process the message (e.g., send an email or notification)
            
          // Acknowledge the message
          channel.ack(msg);
        }
      });
    } catch (error) {
      console.error("Error consuming messages:", error);
    }
  }

//  async function sendSignupNotification  (message)  {
//     try {
//       if (!channel) {
//         console.error("RabbitMQ channel is not available");
//         return;
//       }
  
//       // Send message to the queue
//       channel.sendToQueue(
//         "signup_notifications",
//         Buffer.from(JSON.stringify(message))
//       );
//       console.log(`Message sent to queue: ${JSON.stringify(message)}`);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };
  

// app.post("/send-message", async(req,res)=>{
//     await sendSignupNotification({
//         userName:"Paras",
//         age:24
//     });
//     res.status(200).json("success");
// });


app.listen(5000,()=>{
    console.log("user server listening on port 3000")
});