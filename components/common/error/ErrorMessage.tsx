import React from "react";

import I18n from "components/common/i18n";
import useQuoteObtaining from "hooks/useQuoteObtaining";
// import { getStringDate, getErrorDetails } from "../../../lib/commonFunctions";
import { getErrorDetails } from "../../../lib/commonFunctions";
import {
  IQuoteObtainingError,
  emptyQuoteObtainingError,
} from "contexts/QuoteObtaining";
import { MessageTitle } from "../styles/UtilsStyles";

// const SCHEDULED = "SCHEDULED";
// const BAD_REQUEST = "BAD_REQUEST";
// const INTERNAL_ERROR_SERVER = "INTERNAL_ERROR_SERVER";
// const DEFAULT_VALUE = "default";
// const UNKNOWN_ERROR = "UNKNOWN_ERROR";

function ErrorMessage(): JSX.Element {
  const [{error}] = useQuoteObtaining();

  const errorDetails: IQuoteObtainingError = getErrorDetails(
    error?.graphQLErrors[0]?.extensions.details || emptyQuoteObtainingError
  );
  return (
    <>
      <MessageTitle type="ERROR">
        <I18n
          id={`app.quoteObtaining.error.${errorDetails.reason}.title`}
        />
      </MessageTitle>
      
      <p>
        <I18n
          id={`app.quoteObtaining.error.${errorDetails.reason}.message`}
        />
      </p>
      <br />
    </>
  );
}

export default ErrorMessage;
