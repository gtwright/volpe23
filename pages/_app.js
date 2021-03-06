import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../lib/theme";
import { CloudinaryContext } from "cloudinary-react";

// export default function App({ Component, pageProps }) {
//   const apolloClient = useApollo(pageProps.initialApolloState);

//   return (
//     <ApolloProvider client={apolloClient}>
//       <Component {...pageProps} />
//     </ApolloProvider>
//   );
// }

export default function App(props) {
  const { Component, pageProps } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>In Celebration of Mark Volpe’s 23 Years of Leadership</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <CloudinaryContext cloudName="bostonsymphony">
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </CloudinaryContext>
      </ThemeProvider>
    </React.Fragment>
  );
}
