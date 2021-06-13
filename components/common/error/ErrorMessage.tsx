import React from 'react';

import I18n from 'components/common/i18n';
import useDeliveryReschedule from 'hooks/useDeliveryReschedule';
import { getStringDate, getErrorDetails } from 'lib/commonFunctions';
import {
  ISchedulingError,
  emptySchedulingError,
} from 'contexts/DeliveryReschedule';
import { MessageTitle } from '../styles/UtilsStyles';

const SCHEDULED = 'SCHEDULED';
const BAD_REQUEST = 'BAD_REQUEST';
const INTERNAL_ERROR_SERVER = 'INTERNAL_ERROR_SERVER';
const DEFAULT_VALUE = 'default';
const ECOMMERCE = 'Ecommerce';
const UNKNOWN_ERROR = 'UNKNOWN_ERROR';
const OPTIONAL_DATE_CHANGE = 'OPTIONAL_DATE_CHANGE';
const INVALID_ADDRESS = 'INVALID_ADDRESS';

function ErrorMessage(): JSX.Element {
  const [error, deliveryReschedule] = useDeliveryReschedule();

  const errorDetails: ISchedulingError = getErrorDetails(
    error?.graphQLErrors[0]?.extensions.details || emptySchedulingError
  );

  if (deliveryReschedule.reason === OPTIONAL_DATE_CHANGE) {
    if (
      errorDetails.reason !== BAD_REQUEST &&
      errorDetails.reason !== INTERNAL_ERROR_SERVER &&
      errorDetails.reason !== DEFAULT_VALUE &&
      errorDetails.reason !== UNKNOWN_ERROR
    ) {
      return (
        <>
          <MessageTitle type="ERROR">
            <I18n
              id={`order.delivery.reschedule.error.${errorDetails.saleChannel}.${errorDetails.reason}.title`}
            />
          </MessageTitle>
          <br />

          {errorDetails.reason === SCHEDULED && (
            <>
              <I18n
                id={`order.delivery.reschedule.error.${errorDetails.saleChannel}.SCHEDULED.wasDelivered`}
              />
              <b>
                {getStringDate(errorDetails.date)}
                <I18n
                  id={`order.delivery.reschedule.error.${errorDetails.saleChannel}.SCHEDULED.shiftPreposition`}
                />
                <I18n
                  id={`order.delivery.reschedule.message.shift.${errorDetails.shift}`}
                />
              </b>
            </>
          )}

          {errorDetails.reason !== SCHEDULED && (
            <>
              <I18n
                id={`order.delivery.reschedule.error.${errorDetails.saleChannel}.${errorDetails.reason}.message`}
              />
            </>
          )}

          {errorDetails.saleChannel !== ECOMMERCE && (
            <p>
              <I18n
                id={`order.delivery.reschedule.error.${errorDetails.saleChannel}.${errorDetails.reason}.alternatives`}
              />
            </p>
          )}

          {errorDetails.saleChannel === ECOMMERCE && (
            <p>
              <I18n
                id={`order.delivery.reschedule.error.Ecommerce.${errorDetails.reason}.alternativespart1`}
              />
              <I18n
                id={`order.delivery.reschedule.error.Ecommerce.${errorDetails.reason}.alternativespart2`}
              />
              <I18n
                id={`order.delivery.reschedule.error.Ecommerce.${errorDetails.reason}.alternativespart3`}
              />
            </p>
          )}

          <br />
        </>
      );
    } else {
      return (
        <>
          <MessageTitle type="ERROR">
            <I18n
              id={`order.delivery.reschedule.error.${errorDetails.saleChannel}.${errorDetails.reason}.title`}
            />
          </MessageTitle>
          <br />
          <p>
            <I18n
              id={`order.delivery.reschedule.error.${errorDetails.saleChannel}.${errorDetails.reason}.message`}
            />
          </p>
          <br />
        </>
      );
    }
  }

  if (deliveryReschedule.reason === INVALID_ADDRESS) {
    return (
      <>
        <MessageTitle type="ERROR">
          <I18n
            id={`order.delivery.reschedule.error.${errorDetails.saleChannel}.${errorDetails.reason}.title`}
          />
        </MessageTitle>
        <br />
        <p>
          <I18n
            id={`order.delivery.reschedule.error.${errorDetails.saleChannel}.${errorDetails.reason}.message`}
          />
          <I18n
            id={`order.delivery.reschedule.error.${errorDetails.saleChannel}.${errorDetails.reason}.alternatives`}
          />
        </p>
        <br />
      </>
    );
  }
}

export default ErrorMessage;
