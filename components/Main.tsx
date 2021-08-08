import React from "react";
import useQuoteObtaining from "../hooks/useQuoteObtaining";
import ViewWrapper from "./layout/structure/ViewWrapper";
import Message from "./layout/Message";
import ErrorMessage from "./common/error/ErrorMessage";
import ChooseQuote from "./layout/operations/ChooseQuote";
import ChangeDate from "./layout/operations/ChangeDate";

function Main(): JSX.Element {
  const [{ quotes, operation }] = useQuoteObtaining();


  if (operation==='chooseQuote') return <ChooseQuote />;

  if (operation==='changeDate') return <ChangeDate />;

  return (
    <ViewWrapper>
      <Message type="ERROR">
        <ErrorMessage />
      </Message>
    </ViewWrapper>
  );
}

export default Main;
