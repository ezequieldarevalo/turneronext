import React from "react";
import useQuoteObtaining from "hooks/useQuoteObtaining";
import ViewWrapper from "../../structure/ViewWrapper";
import Message from "../../Message";
import ErrorMessage from "../../../common/error/ErrorMessage";
import SelectDate from "./views/SelectDate";
import SelectPaymentMethod from "./views/SelectPaymentMethod";

function ChooseQuote(): JSX.Element {
  const [{ error, quoteSelected, dateSelected }] = useQuoteObtaining();

  if (error)
    return (
      <ViewWrapper>
        <Message type="ERROR">
          <ErrorMessage />
        </Message>
      </ViewWrapper>
    );

  if (!dateSelected)
    return (
      <ViewWrapper hasProducts={true}>
        <SelectDate />
      </ViewWrapper>
    );

  if (dateSelected)
    return (
      <ViewWrapper hasProducts={true}>
        <SelectPaymentMethod />
        
      </ViewWrapper>
    );
}

export default ChooseQuote;
