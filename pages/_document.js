import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <title>Routh Table Generator</title>
          <meta name="title" content="Routh Table Generator" />
          <meta
            name="description"
            content="In control system theory, the Routh–Hurwitz stability criterion is a mathematical test that is a necessary and sufficient condition for the stability of a linear time-invariant (LTI) control system."
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://routhtable.netlify.app" />
          <meta property="og:title" content="Routh Table Generator" />
          <meta
            property="og:description"
            content="In control system theory, the Routh–Hurwitz stability criterion is a mathematical test that is a necessary and sufficient condition for the stability of a linear time-invariant (LTI) control system."
          />
          <meta
            property="og:image"
            content="https://routhtable.netlify.app/meta.jpg"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://routhtable.netlify.app"
          />
          <meta property="twitter:title" content="Routh Table Generator" />
          <meta
            property="twitter:description"
            content="In control system theory, the Routh–Hurwitz stability criterion is a mathematical test that is a necessary and sufficient condition for the stability of a linear time-invariant (LTI) control system."
          />
          <meta
            property="twitter:image"
            content="https://routhtable.netlify.app/meta.jpg"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
