import { io, Socket } from 'socket.io-client';
import React, { useEffect } from 'react';


function Index() {
    let socket: Socket;
    useEffect(() => {
        socket = io();
        socket.on('now', data => console.log(data));
    });

    return (
        <h1>Hello World</h1>
    )
}

export default Index;