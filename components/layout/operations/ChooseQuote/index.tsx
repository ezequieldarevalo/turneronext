import React from "react";
import useQuoteObtaining from "hooks/useQuoteObtaining";
import ViewWrapper from "../../structure/ViewWrapper";
import Message from "../../Message";
import ErrorMessage from "../../../common/error/ErrorMessage";
import SelectDate from './views/SelectDate'

function ChooseQuote(): JSX.Element {
  const [error] = useQuoteObtaining();

  if (error) {
    <ViewWrapper>
      <Message type="ERROR">
        <ErrorMessage />
      </Message>
    </ViewWrapper>;
  }

  return (
    <ViewWrapper>
      <SelectDate />
    </ViewWrapper>
  );
}

export default ChooseQuote;
