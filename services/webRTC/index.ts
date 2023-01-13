import Peer from 'simple-peer';
export class WebRTCService {
    private static instance: WebRTCService;
    private peer;
    private stream;
    private signal;

    private constructor(signal: any) {

        console.log("constructing webRTC service ");
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                this.stream = currentStream;
            });
        this.peer = new Peer({ initiator: false, trickle: false, stream: this.stream });
        this.peer.signal(signal)
        this.signal = signal
    }

    public static async Instance(signal?: any) {
        if (!this.instance) {
            if (signal)
                this.instance = new this(signal);
            else
                return null
        }
        return this.instance;
    }



    public onSignal(callback: Function) {
        this.peer.on('signal',callback)
    }

    public onStream(callback: Function) {
       this.peer.on('stream',callback)
    }

    public getSignal(){
        return this.signal
    }

}