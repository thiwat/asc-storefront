import "../styles/global.css";
import _get from "lodash/get";
import Head from "next/head";
import { getRGBColor } from "@/utils/color";
import { Noto_Sans_Thai } from "next/font/google";
import Layout from "@/components/layout";

const noto_sans_thai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MyApp = ({ Component, pageProps }) => {

  return (
    <>
      <Head>
        <title>{"ASC"}</title>
        <style>{`
          :root {
            ${getRGBColor("#0059AF", "primary")}
            ${getRGBColor("#04A6B1", "secondary")}
            --font-noto_sans_thai: ${noto_sans_thai.style.fontFamily}
          }

          input::-ms-reveal,
          input::-ms-clear {
            display: none;
          }

          body {
            font-family: var(--font-noto_sans_thai);
          }

        `}</style>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/images/logo.png" />
        <meta name="description" content={"ASC"}></meta>
        <meta name="keywords" content={"ASC"} />
        <meta
          property="og:title"
          content={"ASC"}
          key="title"
        />
        <meta
          property="og:description"
          content={"ASC"}
        ></meta>
        <meta property="og:image" content={"/images/logo.png"}></meta>
        <meta name="twitter:image" content={"/images/logo.png"}></meta>
      </Head>
      <>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <div id={"main-container"}></div>
      </>
    </>
  );
};

export default MyApp;
