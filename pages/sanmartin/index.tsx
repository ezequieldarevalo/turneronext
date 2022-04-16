import React from "react";
import Main from "../../components/Main";
import QuoteObtainingProvider from "contexts/QuoteObtaining";

import HeaderSanmartin from "components/layout/structure/HeaderSanmartin";


function QuoteObtainingSMPage(): JSX.Element {
  return (
    <>
      <HeaderSanmartin />
      <QuoteObtainingProvider id={''} plant={"sanmartin"} operation={'chooseQuote'}>
        <Main />
      </QuoteObtainingProvider>
    </>
  );
}

export default QuoteObtainingSMPage;
