import React, { useState } from "react";
import useQuoteObtaining from "hooks/useQuoteObtaining";
import Message from "components/layout/Message";
import I18n from "components/common/i18n";
import styled from "styled-components";
import StepTitle from "components/common/StepTitle";
import { getStringDate, getStringTime } from "lib/commonFunctions";
import { vehicleTypeList } from "lib/constants";
import {Btn} from "components/common/styles/UtilsStyles"

interface TitleProps {
    noMargin?: boolean;
  }
  export const Title = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%;
    margin-top: ${(props: TitleProps) => (props.noMargin ? '0' : '50px')};
    @media (max-width: 996px) {
      margin-top: ${(props: TitleProps) => (props.noMargin ? '0' : '25px')};
    }
  `;

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

const VehicleTypeSelectionPanel = styled.div`
    padding: 20px;
`;

interface VehicleTypeButtonProps {
    selected?: boolean;
  }

const VehicleTypeButton = styled.button`
    background: ${(props: VehicleTypeButtonProps) => (props.selected ? 'grey' : 'none')};
    color: ${(props: VehicleTypeButtonProps) => (props.selected ? 'white' : 'none')};
    font-family: Nunito-Bold;
    border-radius: 5px;
    border: 1px solid grey;
    height: 40px;
    margin-right: 20px;
    padding: 0 15px;
    @media (max-width: 996px) {
        display: block;
        margin-bottom: 10px;
      }
`;

const BtnContainer = styled.div`
  text-align: left;
  font-family: Nunito-SemiBold;
//   margin-top: 22px;
  @media (max-width: 996px) {
    // margin-top: 33px;
  }
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

function SelectVehicleType() {
    const [{plant, operation}, { onSelectVehicleType }] =
    useQuoteObtaining();

    const [vehicleTypeSelected, setVehicleTypeSelected] = useState<string>(vehicleTypeList[0]);

  const getWarningLinesByOperation = (operation: string): IMessagesList[] => {
    if (operation === "chooseQuote") return getChooseQuoteMessages(plant);
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
          {warningLines.map((line: IMessagesList) => {
            return (
              <p key={line.id}>
                <I18n id={line.content} />
              </p>
            );
          })}
        </MessageContent>
      </Message>
      <StepTitle plant={plant} stepNumber={1}>
        <I18n id="app.quoteObtaining.schedule.calendar.step1.title" />
      </StepTitle>
      <VehicleTypeSelectionPanel>
        { vehicleTypeList.map((vehicleType)=>{
            let selected = false;
            if(vehicleTypeSelected===vehicleType) {
                selected=true;
            }
            return <VehicleTypeButton selected={selected} onClick={() => setVehicleTypeSelected(vehicleType)}>{vehicleType}</VehicleTypeButton>
        })}
      </VehicleTypeSelectionPanel>
      <BtnContainer>
          <Btn plant={plant} onClick={()=> onSelectVehicleType(vehicleTypeSelected)}>
          <I18n id="app.quoteObtaining.schedule.calendar.continue" />
        </Btn>
          </BtnContainer>
    </>
  );
}

export default SelectVehicleType;
