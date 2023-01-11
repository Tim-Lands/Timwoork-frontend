import Peer from 'simple-peer';
export class WebRTCService {
    private static instance: WebRTCService;
    private peer;
    private stream;
    private constructor() {
        console.log("constructing webRTC service ");
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                this.stream = currentStream;
            });
        this.peer = new Peer({ initiator: false, trickle: false, stream:this.stream });
    }

    public static async Instance() {
        if (!this.instance) {
          this.instance = new this();
        }
        return this.instance;
      }

    public onSignal(callback:Function){
        callback()
    }

    public onStream(callback:Function){
        callback(this.stream)
    }
    
}