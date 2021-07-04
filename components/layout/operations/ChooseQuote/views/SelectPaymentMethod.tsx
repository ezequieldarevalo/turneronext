import React from "react";
import useQuoteObtaining from "hooks/useQuoteObtaining";
import StepTitle from "components/common/StepTitle";
import I18n from "components/common/i18n";
import GreyStepBox from "components/common/GreyStepBox";
import styled from "styled-components";
import { capitalizeFirstChar, getStringDate } from "lib/commonFunctions";
import Image from "next/image";
import {Btn} from "components/common/styles/UtilsStyles"

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

const ImgContainer = styled.div`
  border-radius: 8px;
`;

const BtnContainer = styled.div`
  text-align: right;
  font-family: Nunito-SemiBold;
  margin-top: 22px;
  @media (max-width: 996px) {
    margin-top: 33px;
  }
`;

function SelectPaymentMethod() {
  const [{ quotes,quoteSelected, paymentPlatform }, { onModifyDateAddressChange, onChangePaymentPlatform, onSubmitPaymentPlatform }] =
    useQuoteObtaining();
  return (
    <>
      <StepTitle plant={quotes.plant} checked noMargin stepNumber={1}>
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

      <StepTitle plant={quotes.plant} stepNumber={2}>
        <I18n id="app.quoteObtaining.schedule.calendar.step2.title" />
      </StepTitle>

      <GreyStepBox>
        <>
          <ChooseMessage>
            <I18n id="app.quoteObtaining.schedule.calendar.paymentMethod.subtitle" />
          </ChooseMessage>
          <br/>
          <br/>
          <input onClick={()=>onChangePaymentPlatform("yacare")}
            type="radio"
            id="Yacare"
            name="paymentPlatform"
            value="Yacare"
            defaultChecked={paymentPlatform==='yacare'}
          />
          <label htmlFor="Yacare">Yacare</label>
          <br/>
          <ImgContainer>
            <Image
              className="platform"
              src="/img/yacare.png"
              alt="pepe"
              width="200"
              height="65"
            />
          </ImgContainer>

          <br/>
          <input onClick={()=>onChangePaymentPlatform("mercadoPago")}
            type="radio"
            id="MercadoPago"
            name="paymentPlatform"
            value="MercadoPago"
            defaultChecked={paymentPlatform==='mercadoPago'}
          />
          <label htmlFor="MercadoPago">Mercado Pago</label>
          <ImgContainer>
            <Image
              className="platform"
              src="/img/meli.png"
              alt="pepe"
              width="200"
              height="65"
            />
          </ImgContainer>
          <BtnContainer>
          <Btn plant={quotes.plant} onClick={()=> onSubmitPaymentPlatform()}>
          <I18n id="app.quoteObtaining.schedule.calendar.continue" />
        </Btn>
          </BtnContainer>
          
        </>
      </GreyStepBox>
    </>
  );
}

export default SelectPaymentMethod;
