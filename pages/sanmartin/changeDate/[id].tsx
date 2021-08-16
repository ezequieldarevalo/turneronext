import React from "react";
import { useRouter } from "next/router";
import Main from "components/Main";
import QuoteObtainingProvider from "contexts/QuoteObtaining";
import ViewWrapper from "components/layout/structure/ViewWrapper";
import Message from "components/layout/Message";
import ErrorMessage from "components/common/error/ErrorMessage";
import HeaderSanmartin from "components/layout/structure/HeaderSanmartin";


function ChangeDateLHPage(): JSX.Element {
  const {
    query: { id },
  } = useRouter();

  return (
    <><HeaderSanmartin />
      {id ? (
        <QuoteObtainingProvider id={id.toString()} plant={"sanmartin"} operation={'changeDate'}>
          <Main />
        </QuoteObtainingProvider>
      ) : (
        <ViewWrapper>
          <Message type="ERROR">
            <ErrorMessage />
          </Message>
        </ViewWrapper>
      )}
    </>
  );
}

export default ChangeDateLHPage;
