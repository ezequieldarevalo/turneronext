import React from "react";
import ViewWrapper from "../../structure/ViewWrapper";
import Message from "../../Message";
import ErrorMessage from "../../../common/error/ErrorMessage";
import GiveEmail from "./views/GiveEmail";
import {
  emptySchedulingError,
  ISchedulingError,
} from "contexts/QuoteObtaining";
import { getErrorDetails } from "lib/commonFunctions";
import useQuoteObtaining from "hooks/useQuoteObtaining";
import SuccessCancelQuote from "./views/SuccessCancelQuote";
import Summary from "./views/Summary";

const EXISTS_QUOTE_DOMAIN = "EXISTS_QUOTE_DOMAIN";
const INVALID_EMAIL = "INVALID_EMAIL";

function CancelQuote(): JSX.Element {
  const [{ error, emailEntered, cancelQuoteDone }] = useQuoteObtaining();

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

  if (!emailEntered && !cancelQuoteDone)
    return (
      <ViewWrapper hasProducts={true}>
        <GiveEmail />
      </ViewWrapper>
    );

  if (emailEntered && !cancelQuoteDone)
    return (
      <ViewWrapper hasProducts={true}>
        <Summary />
      </ViewWrapper>
    );

  if (cancelQuoteDone)
    return (
      <ViewWrapper hasProducts={true}>
        <>
          <SuccessCancelQuote />
        </>
      </ViewWrapper>
    );
}

export default CancelQuote;
