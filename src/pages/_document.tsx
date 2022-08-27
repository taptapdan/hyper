import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>http request observer</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Lexend:wght@400&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lexend:wght@700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="text-lg font-lexend text-slate-800 bg-slate-500">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
