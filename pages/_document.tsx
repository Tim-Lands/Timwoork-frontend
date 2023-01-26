import Document, { Html, Head, Main, NextScript } from "next/document";
export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="ar">
        <Head>
          {/* <title>تيموورك</title> */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
          />
          <link
            rel="stylesheet"
            href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          />

          <link rel="icon" href="/logo.png" />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6371231196080126"
            crossOrigin="anonymous"
          ></script>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-8NR88QZ76Y"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
gtag('config', 'G-8NR88QZ76Y');`,
            }}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-P7QV372');`,
            }}
          ></script>
        </Head>
        <body>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-P7QV372"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
