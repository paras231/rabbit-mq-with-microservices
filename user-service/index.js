
const express =  require('express');
const amqp  =  require("amqplib");

const app = express();



app.use(express.json());


let channel , connection;


async function connectWithRabbitmq(){
    try {
        connection = await amqp.connect("amp://localhost");
        // Create a channel
    channel = await connection.createChannel();
    channel.assertQueue("send_message");
    console.log('connected to rabbitmq server for user service')
    } catch (error) {
        console.log("somethng with wrong",error)
    }
}

async function sendMessageNotification(payload){
    try {
        
    } catch (error) {
        
    }
}

app.post("/send-message", async(req,res)=>{
    res.status(200).json("success");
})


app.listen(3000,()=>{
    console.log("user server listening on port 3000")
});