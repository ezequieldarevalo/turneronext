import React from "react";
import { useRouter } from "next/router";
import Main from "components/Main";
import QuoteObtainingProvider from "contexts/QuoteObtaining";
import ViewWrapper from "components/layout/structure/ViewWrapper";
import Message from "components/layout/Message";
import ErrorMessage from "components/common/error/ErrorMessage";
import HeaderGodoycruz from "components/layout/structure/HeaderGodoycruz";


function ChangeDateGCPage(): JSX.Element {
  const {
    query: { id },
  } = useRouter();

  return (
    <><HeaderGodoycruz />
      {id ? (
        <QuoteObtainingProvider id={id.toString()} plant={"godoycruz"} operation={'changeDate'}>
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

export default ChangeDateGCPage;
