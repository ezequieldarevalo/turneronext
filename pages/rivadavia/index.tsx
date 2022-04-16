import React from "react";
import Main from "../../components/Main";
import QuoteObtainingProvider from "contexts/QuoteObtaining";

import HeaderRivadavia from "components/layout/structure/HeaderRivadavia";


function QuoteObtainingRivPage(): JSX.Element {
  return (
    <>
      <HeaderRivadavia />
      <QuoteObtainingProvider id={''} plant={"rivadavia"} operation={'chooseQuote'}>
        <Main />
      </QuoteObtainingProvider>
    </>
  );
}

export default QuoteObtainingRivPage;

