import React from "react";
import Main from "../../components/Main";
import QuoteObtainingProvider from "contexts/QuoteObtaining";

import HeaderGodoycruz from "components/layout/structure/HeaderGodoycruz";


function QuoteObtainingGcPage(): JSX.Element {
  return (
    <>
      <HeaderGodoycruz />
      <QuoteObtainingProvider id={''} plant={"godoycruz"} operation={'chooseQuote'}>
        <Main />
      </QuoteObtainingProvider>
    </>
  );
}

export default QuoteObtainingGcPage;
