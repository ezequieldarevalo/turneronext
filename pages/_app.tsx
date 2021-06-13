import "../styles/globals.css";
import type { AppProps } from "next/app";
import App from 'next/app'
import { ApolloProvider } from "@apollo/react-hooks";
import { useApollo } from "../lib/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient as any}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (appContext:any) => {
  const appProps=await App.getInitialProps(appContext);
  return {...appProps};
};

export default MyApp;
