import React, { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
const Video = () => {
    const socket = io('http://localhost:5000');
    const [callAccepted, setCallAccepted] = useState(false);
    // const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const [idToCall, setIdToCall] = useState('');

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    console.log(callAccepted)

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
            });

        socket.on('me', (id) => setMe(id));

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, []);

    const answerCall = () => {
        console.log('answering call')
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
            console.log(call.from)
        });

        peer.on('stream', (currentStream) => {
            console.log('streaming ')
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });



        connectionRef.current = peer;
    };
    socket.on('callAccepted', (signal) => {
        console.log('call accepted event has been fireds')
        setCallAccepted(true);
        connectionRef.current.signal(signal);
    });
    /* const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();
    }; */

    return (
        <>

            <div>
                <h2>ID: {me}</h2>
                {stream && (
                    <video playsInline ref={myVideo} autoPlay muted />
                )}
                
                    
                        <video playsInline ref={userVideo} autoPlay />
                
                
                <p>your name</p>
                <input type='text' value={name} onChange={e => setName(e.target.value)} />
                <p>participant id</p>
                <input type="text" value={idToCall} onChange={e => setIdToCall(e.target.value)} />
                <button onClick={() => callUser(idToCall)} >call</button>
                {call.isReceivingCall &&
                    <>
                        <p>{call.name} in calling</p>
                        <button onClick={()=>answerCall()}>answer</button>
                    </>
                }
            </div>
        </>
    )
}
export default Video