import { io } from "socket.io-client";
import Cookies from "js-cookie";

export default class SocketService {
  private static readonly ENDPOINT: String = "https://timwork.app";
  private static instance: SocketService;
  private socket;
  private constructor(token:string) {
    console.log("constructing socket service ");
    this.socket = io(`${SocketService.ENDPOINT}`, {
      query: {
        token,
      },
    });
  }
  public static async Instance() {
    if (!this.instance) {
      const token = Cookies.get("token");
      this.instance = new this(token);
    }
    return this.instance;
  }

  listenForEstablishSignaling(callback:Function){
    this.socket.on('me',callback)
  }

  listenForIncomingCall(callback:Function){
    this.socket.on('callUser', callback);  
  }
  
  listenForAcceptedCall(callback:Function){
    this.socket.on('callAccepted',callback)
  }

  dispatchAnswerCall(callback:Function){
    this.socket.on('answerCall', callback)
  }

  dispatchCall(callback:Function){
    this.socket.on('callUser', callback)
  }

  disconnect() {
    this.socket.disconnect();
  }
}
