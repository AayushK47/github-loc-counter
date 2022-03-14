import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Socket, io } from 'socket.io-client';

import Navbar from '../../components/Navbar';

function Stats() {
    let socket: Socket;
    const router = useRouter();
    const [message, setMessage] = useState('Connecting to the socket...');

    useEffect(() => {
        if (router.isReady) {
            socket = io();
            socket.on('connect', () => {
                socket.emit('start', router.query.username);
            });

            socket.on('progress', (data) => {
                setMessage(data);
            });

            socket.on('finish', (locData) => {
                setMessage('Preparing the charts...');
                console.log(locData);
                socket.close();
            });
        }
    }, [router.isReady]);

    return (
        <>
            <Navbar />
            <div className="bg-slate-200 h-screen">
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <div className="grid place-items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="#1f2937" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                    <div>{message}</div>
                </div>
            </div>
        </>
    )
}

export default Stats;