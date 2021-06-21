import React from "react";
import useQuoteObtaining from "hooks/useQuoteObtaining";
import StepTitle from "components/common/StepTitle";
import I18n from "components/common/i18n";
import GreyStepBox from "components/common/GreyStepBox";
import styled from "styled-components";
import { capitalizeFirstChar, getStringDate } from "lib/commonFunctions";

const DateSelected = styled.div`
  position: relative;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.69;
  letter-spacing: -0.24px;
  color: #000000;
`;

const ChooseMessage = styled.div`
  position: relative;
  font-family: Nunito-SemiBold;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: -0.29px;
  color: #000000;

`;

function SelectPaymentMethod() {
  const [{ quoteSelected }, { onModifyDateAddressChange }] =
    useQuoteObtaining();
  return (
    <>
      <StepTitle checked noMargin stepNumber={1}>
        <I18n id="app.quoteObtaining.schedule.calendar.step1.title" />
      </StepTitle>

      <GreyStepBox withModify={true} modifyFunction={onModifyDateAddressChange}>
        <DateSelected>
          <b>Fecha:</b>{" "}
          {capitalizeFirstChar(getStringDate(quoteSelected.fecha))}
          {"."}
          <br />
          <b>Hora:</b> {quoteSelected.hora.substr(0, 5)}
        </DateSelected>
      </GreyStepBox>

      <StepTitle stepNumber={2}>
        <I18n id="app.quoteObtaining.schedule.calendar.step2.title" />
      </StepTitle>

      <GreyStepBox>
        <ChooseMessage>
          <I18n id="app.quoteObtaining.schedule.calendar.paymentMethod.subtitle" />
        </ChooseMessage>
      </GreyStepBox>
    </>
  );
}

export default SelectPaymentMethod;
