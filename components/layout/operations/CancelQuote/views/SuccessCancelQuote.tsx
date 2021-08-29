import React from "react";
import Message from "../../../Message";
import { MessageTitle } from "../../../../common/styles/UtilsStyles";
import I18n from "components/common/i18n";
import useQuoteObtaining from "hooks/useQuoteObtaining";

function SuccessChangeDate(): JSX.Element {
  const [{ quotes, quoteSelected }] = useQuoteObtaining();

  return (
    <>
      <Message type="SUCCESS">
        <MessageTitle type="SUCCESS">
          <I18n id="order.delivery.reschedule.cancelQuote.schedule.title.quoteCancelled" />
        </MessageTitle>
        <p>
          <I18n id="order.delivery.reschedule.cancelQuote.schedule.message.onlyone" />
        </p>
        <br />
      </Message>
    </>
  );
}

export default SuccessChangeDate;
