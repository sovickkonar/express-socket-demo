require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = require('./src');
const  { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer(app);

const io = new Server(httpServer);

let users = {};
io.on('connection',(socket)=>{

    socket.on('new-user-connected',(user_name)=>{
        users[socket.id] = user_name;
        socket.broadcast.emit('new-user-joined',user_name);
    })

    socket.on('disconnect',()=>{
        console.log(users[socket.id],'disconnected');
    })

    socket.on('chat-message-sent',(message)=>{
        socket.broadcast.emit('chat-message-received',{
            user_name : users[socket.id],
            message
        });
    })

})

httpServer.listen(PORT,()=>{
    console.log(`Server running on http://127.0.0.1:${PORT}`);
})