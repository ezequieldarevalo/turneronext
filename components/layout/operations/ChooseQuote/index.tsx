import React from "react";
import useQuoteObtaining from "hooks/useQuoteObtaining";
import ViewWrapper from "../../structure/ViewWrapper";
import Message from "../../Message";
import ErrorMessage from "../../../common/error/ErrorMessage";
import SelectDate from "./views/SelectDate";
import SelectPaymentMethod from "./views/SelectPaymentMethod";
import GiveEmail from "./views/GiveEmail";
import Summary from "./views/Summary";
import {
  emptySchedulingError,
  ISchedulingError,
} from 'contexts/QuoteObtaining';
import { getErrorDetails } from 'lib/commonFunctions';


const EXISTS_QUOTE_DOMAIN='EXISTS_QUOTE_DOMAIN';
const INVALID_EMAIL='INVALID_EMAIL';

function ChooseQuote(): JSX.Element {
  const [{ error, dateSelected, paymentPlatformSelected, emailEntered }] =
    useQuoteObtaining();

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
}

export default ChooseQuote;
