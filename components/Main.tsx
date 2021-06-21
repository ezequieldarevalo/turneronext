import React from "react";
import useQuoteObtaining from "../hooks/useQuoteObtaining";
import ViewWrapper from "./layout/structure/ViewWrapper";
import Message from "./layout/Message";
import ErrorMessage from "./common/error/ErrorMessage";
import ChooseQuote from './layout/operations/ChooseQuote'

function Main(): JSX.Element {
  const [{quotes}] = useQuoteObtaining();
  return (
    <>
      {quotes? <ChooseQuote /> : (
        <ViewWrapper>
          <Message type="ERROR">
            <ErrorMessage />
          </Message>
        </ViewWrapper>
      )}
    </>
  );
}

export default Main;
