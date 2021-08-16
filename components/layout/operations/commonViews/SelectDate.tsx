import React from "react";
import useQuoteObtaining from "hooks/useQuoteObtaining";
import Message from "components/layout/Message";
import I18n from "components/common/i18n";
import styled from "styled-components";
import StepTitle from "components/common/StepTitle";
import Calendar from "components/common/Calendar";
import { getStringDate, getStringTime } from "lib/commonFunctions";

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

interface IMessagesList {
  id: number;
  content: string;
}

const getChooseQuoteMessages = (plant:string):IMessagesList[] => {
  if (plant==='sanmartin')
  return [{ id: 1, content: `app.quoteObtaining.warning.sanmartin.chooseQuote.message1` }];
  return [
    { id: 1, content: `app.quoteObtaining.warning.${plant}.chooseQuote.message1` },
    { id: 2, content: `app.quoteObtaining.warning.${plant}.chooseQuote.message2` },
    { id: 3, content: `app.quoteObtaining.warning.${plant}.chooseQuote.message3` },
  ];
}

const chooseQuoteMessages_sanmartin = [
  { id: 1, content: "app.quoteObtaining.warning.chooseQuote.message1" },
  { id: 2, content: "app.quoteObtaining.warning.chooseQuote.message2" },
  { id: 3, content: "app.quoteObtaining.warning.chooseQuote.message3" },
];

const changeDateMessages = [
  { id: 1, content: "app.quoteObtaining.warning.changeDate.message1" },
];

function SelectDate() {
  const [{ quotes, operation }] = useQuoteObtaining();

  const getWarningLinesByOperation = (operation: string): IMessagesList[] => {
    if (operation === "chooseQuote") return getChooseQuoteMessages(quotes.plant);
    else return changeDateMessages;
  };

  const warningLines = getWarningLinesByOperation(operation);

  return (
    <>
      <Message type={"WARNING"}>
        <MessageTitle>
          <I18n id="app.quoteObtaining.warning.title" />
        </MessageTitle>
        <MessageContent>
          {operation === "changeDate" && (
            <p>
              <I18n id="app.quoteObtaining.warning.chooseQuotes.quoteDate" />
              <b>{" " + getStringDate(quotes.fecha)}</b>
              {" "}
              <I18n id="app.quoteObtaining.warning.chooseQuotes.atTime" />
              {" "}
              <b>{getStringTime(quotes.hora) + "hs."}</b>
            </p>
          )}
          {warningLines.map((line: IMessagesList) => {
            return (
              <p key={line.id}>
                <I18n id={line.content} />
              </p>
            );
          })}
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
