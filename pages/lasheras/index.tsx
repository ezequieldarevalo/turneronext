import React from "react";
import Main from "../../components/Main";
import QuoteObtainingProvider from "contexts/QuoteObtaining";

import HeaderRevitotal from "components/layout/structure/HeaderRevitotal";


function QuoteObtainingLhPage(): JSX.Element {
  return (
    <>
      <HeaderRevitotal />
      <QuoteObtainingProvider id={''} plant={"lasheras"} operation={'chooseQuote'}>
        <Main />
      </QuoteObtainingProvider>
    </>
  );
}

export default QuoteObtainingLhPage;
