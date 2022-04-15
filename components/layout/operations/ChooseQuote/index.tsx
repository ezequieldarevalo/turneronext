import React from "react";
import useQuoteObtaining from "hooks/useQuoteObtaining";
import ViewWrapper from "../../structure/ViewWrapper";
import Message from "../../Message";
import ErrorMessage from "../../../common/error/ErrorMessage";
import SelectDate from "../commonViews/SelectDate";
import SelectVehicleType from "../commonViews/SelectVehicleType";
import SelectPaymentMethod from "./views/SelectPaymentMethod";
import GivePersonalInfo from "./views/GivePersonalInfo";
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
      vehicleTypeSelected,
      dateSelected,
      paymentPlatformSelected,
      personalInfoEntered,
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

  if(!vehicleTypeSelected){
    return (
      <ViewWrapper hasProducts={false}>
        <SelectVehicleType />
      </ViewWrapper>);
  }

  if (quotes && vehicleTypeSelected && !dateSelected)
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

    if (dateSelected && paymentPlatformSelected && !personalInfoEntered)
      return (
        <ViewWrapper hasProducts={true}>
          <>
            <GivePersonalInfo />
          </>
        </ViewWrapper>
      );

    if (dateSelected && paymentPlatformSelected && personalInfoEntered)
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
    if (dateSelected && !personalInfoEntered && !chooseQuoteDone)
      return (
        <ViewWrapper hasProducts={true}>
          <>
            <GivePersonalInfo />
          </>
        </ViewWrapper>
      );

    if (dateSelected && personalInfoEntered && !chooseQuoteDone)
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
