import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
        </style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
