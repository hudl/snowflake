import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <link
            href="https://sc-ui.hudl.com/uniform-ui-css/1.10.2/uniform-ui.css.gz"
            rel="stylesheet"
            type="text/css"
          />
          <script src="https://s3.amazonaws.com/hudl-ui/uniform-ui-components/all/3.14.0/uniform-ui-components_vendor.js.gz" />
          <script src="https://s3.amazonaws.com/hudl-ui/uniform-ui-components/all/3.14.0/uniform-ui-components.js.gz" />
          <meta name="viewport" content="width=device-width" />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
