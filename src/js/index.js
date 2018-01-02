import io from "socket.io-client";

const socket = io();



io.on('connection', function(socket){

    socket.on('log', function(msg){
        console.log('Log: ' + msg);
    });

});
