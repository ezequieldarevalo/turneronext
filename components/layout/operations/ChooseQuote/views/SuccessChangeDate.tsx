import React from 'react';
import Message from '../../../Message';
import { MessageTitle } from '../../../../common/styles/UtilsStyles';
import I18n from 'components/common/i18n';
import { getStringDate, getStringTime } from 'lib/commonFunctions';
import useQuoteObtaining from 'hooks/useQuoteObtaining';

function SuccessChangeDate(): JSX.Element {
  const [
    { quoteSelected },
  ] = useQuoteObtaining();

  return (
    <>
      <Message type="SUCCESS">
        <MessageTitle type="SUCCESS">
          <I18n id="order.delivery.reschedule.chooseQuote.schedule.title.successReschedule" />
        </MessageTitle>
        <p>
          <I18n id="order.delivery.reschedule.dateChange.schedule.message.atDate" />{' '}<b>
          {getStringDate(quoteSelected.fecha)}
          </b>
          {' '}
          <I18n id="order.delivery.reschedule.dateChange.schedule.message.atTime" />{' '}
          <b>
              {getStringTime(quoteSelected.hora)+'hs.'}
          </b>
        </p>
        <p><I18n id="order.delivery.reschedule.chooseQuote.schedule.message.greeting" /></p>
        <p><I18n id="order.delivery.reschedule.dateChange.schedule.message.thanks" /></p>
        <br />
      </Message>
    </>
  );
}

export default SuccessChangeDate;

