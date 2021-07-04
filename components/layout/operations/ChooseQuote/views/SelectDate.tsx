import React from "react";
import useQuoteObtaining from "hooks/useQuoteObtaining";
import Message from "components/layout/Message";
import I18n from "components/common/i18n";
import styled from "styled-components";
import StepTitle from "components/common/StepTitle";
import Calendar from "components/common/Calendar";

const MessageTitle = styled.p`
  color: #d68227;
  font-family: Nunito-Bold;
  font-size: 18px;
`;

const MessageContent = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  font-family: Nunito-Regular;
  font-size: 15px;
`;

function SelectDate() {
  const [{quotes}] = useQuoteObtaining();

  return (
    <>
      <Message type={"WARNING"}>
        <MessageTitle>
          <I18n id="app.quoteObtaining.warning.title" />
        </MessageTitle>
        <MessageContent>
          <p>
            <I18n id="app.quoteObtaining.warning.message1" />
          </p>
          <p>
            <I18n id="app.quoteObtaining.warning.message2" />
          </p>
          <p>
            <I18n id="app.quoteObtaining.warning.message3" />
          </p>
        </MessageContent>
      </Message>
      <StepTitle plant={quotes.plant} stepNumber={1}>
        <I18n id="app.quoteObtaining.schedule.calendar.step1.title" />
      </StepTitle>
      <Calendar />
    </>
  );
}

export default SelectDate;
