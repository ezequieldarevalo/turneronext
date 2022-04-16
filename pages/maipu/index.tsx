import React from "react";
import Main from "../../components/Main";
import QuoteObtainingProvider from "contexts/QuoteObtaining";

import HeaderRevitotal from "components/layout/structure/HeaderRevitotal";


function QuoteObtainingMaPage(): JSX.Element {
  return (
    <>
      <HeaderRevitotal />
      <QuoteObtainingProvider id={''} plant={"maipu"} operation={'chooseQuote'}>
        <Main />
      </QuoteObtainingProvider>
    </>
  );
}

export default QuoteObtainingMaPage;
