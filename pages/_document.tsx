import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <title>تيموورك</title>
                    <link rel="icon" href="/icon.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
