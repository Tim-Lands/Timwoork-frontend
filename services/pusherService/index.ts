import Pusher from "pusher-js";
import Cookies from "js-cookie";
export class PusherService {
  ///////////////////////////////////////////////
  //////////////////////////////////////////////`

  private static instance: PusherService;
  private static readonly ENDPOINT: string =
    "https://api.timwoork.com/api/broadcasting/auth";
  private static readonly FORCE_TLS: boolean = true;
  private static readonly PUSHER_ID: string = "a00614632e45ad3d49ff";
  private static readonly CLUSTER: string = "eu";
  private static userId: number;
  private pusher: any;
  private chatPusher: any;
  private notificationPusher: any;
  private currencyPusher: any;
  private chatChannel: string;
  private notificationChanel: string;
  private currencyChannel: string = "currency";

  private constructor() {
    this.chatChannel = `presence-receiver.${PusherService.userId}`;
    this.notificationChanel = `presence-notify.${PusherService.userId}`;
    this.pusher = new Pusher(PusherService.PUSHER_ID, {
      cluster: PusherService.CLUSTER,
      authEndpoint: PusherService.ENDPOINT,
      forceTLS: PusherService.FORCE_TLS,
      auth:
        Cookies.get("token") || localStorage.getItem("token")
          ? {
              headers: {
                Authorization: `Bearer ${
                  Cookies.get("token") || localStorage.getItem("token")
                }`,
              },
            }
          : undefined,
    });
  }

  public static async Initialize(id) {
    PusherService.userId = id;
    if (!this.instance) {
      return (this.instance = new this());
    } else {
      return this.instance;
    }
  }

  subscription() {
    this.chatPusher = this.pusher.subscribe(this.chatChannel);
    this.notificationPusher = this.pusher.subscribe(this.notificationChanel);
    this.currencyPusher = this.pusher.subscribe(this.currencyChannel);
  }

  bindMessages(callback: any) {
    this.chatPusher?.bind("message.sent", callback);
  }

  bindNotifications(callback: any) {
    this.notificationPusher?.bind("notification.sent", callback);
  }

  bindCurrency(callback: any) {
    this.currencyPusher?.bind("currency", callback);
  }
  unsubscribe() {
    this.pusher.unsubscribe(this.notificationChanel);
    this.pusher.unsubscribe(this.chatChannel);
    this.pusher.unsubscribe(this.currencyChannel);
    PusherService.userId = null;
  }
}
