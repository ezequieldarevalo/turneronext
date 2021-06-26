import { useState } from "react";
import "../styles/globals.css";
import App from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import { useApollo } from "../lib/apollo";
import { I18nProvider, IMessages } from "contexts/I18n";
import initialMessages from "../public/messages/es-AR.json";
import Header from '../components/layout/structure/Header';
import { GlobalStyle } from 'themes/defaultTheme';
import type { AppProps } from 'next/app';

interface II18nStateProps {
  initialLang: string;
  initialMessages: IMessages;
  children: any;
}

function I18nState({
  initialLang,
  initialMessages,
  children,
}: II18nStateProps) {
  const [lang] = useState(initialLang);
  const [messages] = useState(initialMessages);

  return (
    <I18nProvider lang={lang} messages={messages}>
      {children}
    </I18nProvider>
  );
}

interface IProps extends AppProps {
  initialLang: string;
  initialMessages: IMessages;
}

function MyApp({
  Component,
  pageProps,
  initialLang,
  initialMessages,
}: IProps): JSX.Element {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient as any}>
      <I18nState initialLang={initialLang} initialMessages={initialMessages}>
      <Header />
        <Component {...pageProps} />
        <GlobalStyle />
      </I18nState>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const initialLang = "es-AR";
  return {
    initialLang,
    initialMessages,
    ...appProps,
  };
};

export default MyApp;
