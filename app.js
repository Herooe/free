const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let onlineCount = 0;    


app.use('/static',express.static('static'));

app.get('/',(req,res)=>{
    res.sendfile('index.html');
})

io.on('connect',socket=>{

    onlineCount++;
    
    io.emit('register',onlineCount);

    socket.on('disconnect',()=>{
        onlineCount--;
        io.emit('register',onlineCount);
    })
    
    socket.on('chat',val=>{
        io.emit('realtime',{
            name:val.name,
            message:val.message
        });
    })
})

server.listen(3000,()=>{
    console.log('server is listening 3000')
});

