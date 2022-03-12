import React, { useEffect } from 'react';
import { useRouter } from 'next/router'; 
import { Socket, io } from 'socket.io-client';

import Navbar from '../../components/Navbar';

function Stats() {
    let socket: Socket;
    const router = useRouter();

    useEffect(() => {
        socket = io();
        socket.on('now', (data) => {
            console.log(data);
        });
    }, []);

    return (
        <>
            <Navbar />
            <div className="bg-slate-200 h-screen">

            </div>
        </>
    )
}

export default Stats;