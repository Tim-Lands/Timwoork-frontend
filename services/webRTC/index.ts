export class WebRTCService {
    private static instance: WebRTCService;
    private device
    private rtpCapabilities
    private producerTransport
    private consumerTransport
    private producer
    private consumer

    private params: any = {
        // mediasoup params
        encodings: [
            {
                rid: 'r0',
                maxBitrate: 100000,
                scalabilityMode: 'S1T3',
            },
            {
                rid: 'r1',
                maxBitrate: 300000,
                scalabilityMode: 'S1T3',
            },
            {
                rid: 'r2',
                maxBitrate: 900000,
                scalabilityMode: 'S1T3',
            },
        ],
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerCodecOptions
        codecOptions: {
            videoGoogleStartBitrate: 1000
        }
    }

    public getLocalStream(onStreamSuccess: Function) {
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                width: {
                    min: 640,
                    max: 1920,
                },
                height: {
                    min: 400,
                    max: 1080,
                }
            }
        }).then(stream => {
            onStreamSuccess(stream);
            this.params = {
                track: stream.getVideoTracks()[0],
                ...this.params
            }
        })

    }



    private constructor(signal: any) {


    }

    public static async Instance(signal?: any) {

        return this.instance;
    }


}