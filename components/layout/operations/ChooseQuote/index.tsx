import React from "react";
import useQuoteObtaining from "hooks/useQuoteObtaining";
import ViewWrapper from "../../structure/ViewWrapper";
import Message from "../../Message";
import ErrorMessage from "../../../common/error/ErrorMessage";
import SelectDate from "../commonViews/SelectDate";
import SelectPaymentMethod from "./views/SelectPaymentMethod";
import GiveEmail from "./views/GiveEmail";
import Summary from "./views/Summary";
import {
  emptySchedulingError,
  ISchedulingError,
} from "contexts/QuoteObtaining";
import { getErrorDetails } from "lib/commonFunctions";
import SuccessChangeDate from "../ChooseQuote/views/SuccessChangeDate";

const EXISTS_QUOTE_DOMAIN = "EXISTS_QUOTE_DOMAIN";
const INVALID_EMAIL = "INVALID_EMAIL";

function ChooseQuote(): JSX.Element {
  const [
    {
      quotes,
      error,
      dateSelected,
      paymentPlatformSelected,
      emailEntered,
      chooseQuoteDone,
    },
  ] = useQuoteObtaining();

  if (error) {
    const errorDetails: ISchedulingError = getErrorDetails(
      error?.graphQLErrors[0]?.extensions.details || emptySchedulingError
    );

    if (
      errorDetails.reason !== EXISTS_QUOTE_DOMAIN &&
      errorDetails.reason !== INVALID_EMAIL
    ) {
      return (
        <ViewWrapper>
          <Message type="ERROR">
            <ErrorMessage />
          </Message>
        </ViewWrapper>
      );
    }
  }

  if (!dateSelected)
    return (
      <ViewWrapper hasProducts={true}>
        <SelectDate />
      </ViewWrapper>
    );

  if (quotes.plant !== "sanmartin") {
    if (dateSelected && !paymentPlatformSelected)
      return (
        <ViewWrapper hasProducts={true}>
          <SelectPaymentMethod />
        </ViewWrapper>
      );

    if (dateSelected && paymentPlatformSelected && !emailEntered)
      return (
        <ViewWrapper hasProducts={true}>
          <>
            <GiveEmail />
          </>
        </ViewWrapper>
      );

    if (dateSelected && paymentPlatformSelected && emailEntered)
      return (
        <ViewWrapper hasProducts={true}>
          <>
            <Summary />
          </>
        </ViewWrapper>
      );
  } else {
    // RTO SAN MARTIN
    // SIN PAYMENTPLATFLORM
    if (dateSelected && !emailEntered && !chooseQuoteDone)
      return (
        <ViewWrapper hasProducts={true}>
          <>
            <GiveEmail />
          </>
        </ViewWrapper>
      );

    if (dateSelected && emailEntered && !chooseQuoteDone)
      return (
        <ViewWrapper hasProducts={true}>
          <>
            <Summary />
          </>
        </ViewWrapper>
      );

    if (chooseQuoteDone)
      return (
        <ViewWrapper hasProducts={true}>
          <SuccessChangeDate />
        </ViewWrapper>
      );
  }
}

export default ChooseQuote;
