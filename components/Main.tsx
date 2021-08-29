import React from "react";
import useQuoteObtaining from "../hooks/useQuoteObtaining";
import ViewWrapper from "./layout/structure/ViewWrapper";
import Message from "./layout/Message";
import ErrorMessage from "./common/error/ErrorMessage";
import ChooseQuote from "./layout/operations/ChooseQuote";
import ChangeDate from "./layout/operations/ChangeDate";
import CancelQuote from "./layout/operations/CancelQuote";

function Main(): JSX.Element {
  const [{ operation }] = useQuoteObtaining();

  if (operation === "chooseQuote") return <ChooseQuote />;

  if (operation === "changeDate") return <ChangeDate />;

  if (operation === "cancelQuote") return <CancelQuote />;

  return (
    <ViewWrapper>
      <Message type="ERROR">
        <ErrorMessage />
      </Message>
    </ViewWrapper>
  );
}

export default Main;
