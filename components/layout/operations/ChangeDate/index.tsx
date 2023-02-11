import React from "react";
import ViewWrapper from "../../structure/ViewWrapper";
import Message from "../../Message";
import ErrorMessage from "../../../common/error/ErrorMessage";
import SelectDate from "../commonViews/SelectDate";
import GiveEmail from "./views/GiveEmail";
import Summary from "./views/Summary";
import {
  emptySchedulingError,
  ISchedulingError,
} from 'contexts/QuoteObtaining';
import { getErrorDetails } from 'lib/commonFunctions';
import useQuoteObtaining from "hooks/useQuoteObtaining";
import SuccessChangeDate from "./views/SuccessChangeDate";


const EXISTS_QUOTE_DOMAIN='EXISTS_QUOTE_DOMAIN';
const INVALID_EMAIL='INVALID_EMAIL';

function ChangeDate(): JSX.Element {
  const [{ error, dateSelected, emailEntered, changeDateDone }] =
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

  if (dateSelected && !emailEntered)
    return (
      <ViewWrapper hasProducts={true}>
        <>
          <GiveEmail />
        </>
      </ViewWrapper>
    );

  if (dateSelected && emailEntered && !changeDateDone)
    return (
      <ViewWrapper hasProducts={true}>
        <>
          <Summary />
        </>
      </ViewWrapper>
    );

  if(changeDateDone)
  return (
    <ViewWrapper hasProducts={true}>
      <>
        <SuccessChangeDate />
      </>
    </ViewWrapper>
  );
  
}

export default ChangeDate;
