import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {

    render() {

        return (
            <Html lang="ar">
                <Head>
                    <title>تيموورك</title>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" />
                    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />

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
