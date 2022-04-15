import React, { useState } from "react";
import I18n from "components/common/i18n";
import GreyStepBox from "components/common/GreyStepBox";
import StepTitle from "components/common/StepTitle";
import { capitalizeFirstChar, getStringDate } from "lib/commonFunctions";
import styled from "styled-components";
import useQuoteObtaining from "hooks/useQuoteObtaining";
import Image from "next/image";
import { fuelTypeList } from 'lib/constants'

const RadioSection = styled.div`
  display: inline-block;
  margin-right: 20px;
  font-family: Nunito-SemiBold;
`;

const RadioSectionLabel = styled.label`
  margin-right: 4px;
  display: inline;
  font-family: Nunito-SemiBold;
`;

const InputSection = styled.div`
  display: inline-block;
  margin-bottom: 10px;
  margin-left: 10px;
  :fist-of-type{
    margin:left: 0;
  }
  @media (max-width: 996px) {
    margin:left: 0;
  }
`;

const InputLabel = styled.div`
  font-family: Nunito-SemiBold;
  display: inline;
  margin-right: 10px;
  font-size: 15px;
`;

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

const ImgContainer = styled.div`
  margin: 0 auto;
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

interface IBtnProps {
  plant: string;
}

const Btn = styled.button`
  padding: 15px 28px 14px 27px;
  border-radius: 2px;
  background-color: ${(props: IBtnProps) =>
    (props.plant==='rivadavia' || props.plant==='sanmartin' || props.plant==='godoycruz') ? "#052c33" : "rgb(116,172,223)"};
  font-size: 15px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.15px;
  text-align: center;
  color: #ffffff;
  @media (max-width: 996px) {
    width: 100%;
  }
  :disabled {
    background: grey;
  }
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

interface TextInputProps {
  fullWidth?: boolean;
  width?: number;
  boxHeight?: number;
  marginTop?: number;
}

const TextInput = styled.input`
  width: ${(props: TextInputProps) =>
    props.fullWidth ? "100%" : props.width + "px"};
  font-size: 15px;
  height: ${(props: TextInputProps) =>
    props.boxHeight ? props.boxHeight + "px" : "40px"};
  border-radius: 2px;
  border: solid 1px #cccccc;
  background-color: #ffffff;
  padding-left: 8px;
`;

const getImageByPlatform = (platform: string) => {
  if (platform === "yacare") return "/img/yacare.png";
  else return "/img/meli.png";
};

const getGiveEmailStepNumber = (plant: string): number => {
  if (plant === "sanmartin") return 3;
  else return 4;
};

function GivePersonalInfo(): JSX.Element {
  const [
    { quotes, quoteSelected, paymentPlatform, email, dominio, telefono, fuelType, vehicleType },
    {
      onModifyDateAddressChange,
      onModifyPaymentPlatform,
      onSubmitPersonalInfo,
      onModifyVehicleType
    },
  ] = useQuoteObtaining();



  const [localEmail,setLocalEmail] = useState(email);
  const [validEmailFormat, setValidEmailFormat] = useState(false);
  const [localDominio, setLocalDominio] = useState(dominio);
  const [validDominioFormat, setValidDominioFormat] = useState(false);
  const [localTelefono, setLocalTelefono] = useState(telefono);
  const [validTelefonoFormat, setValidTelefonoFormat] = useState(false);
  const [localFuelType, setLocalFuelType] = useState(fuelTypeList[0]);
  const [validFuelTypeFormat, setValidFuelTypeFormat] = useState(false);

  const onChangeEmail = (email: string) => {
    if (
      /^[-\w.%+]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,125}[a-zA-Z]{2,63}$/.test(
        email
      )
    )
      setValidEmailFormat(true);
    else setValidEmailFormat(false);
    setLocalEmail(email);
  };

  const onChangeDominio = (dominio: string) => {
    if (
      /^[-\w.%+]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,125}[a-zA-Z]{2,63}$/.test(
        dominio
      )
    )
      setValidDominioFormat(true);
    else setValidDominioFormat(false);
    setLocalDominio(dominio);
  };

  const onChangeTelefono = (telefono: string) => {
    if (
      /^.*$/.test(
        telefono
      )
    )
      setValidTelefonoFormat(true);
    else setValidTelefonoFormat(false);
    setLocalTelefono(telefono);
  };

  const onChangeFuelType = (fuelType: string) => {
    if (
      /^(NAFTA|DIESEL|GAS)$/.test(
        fuelType
      )
    )
    setValidFuelTypeFormat(true);
    else setValidFuelTypeFormat(false);
    setLocalFuelType(fuelType);
  };

  return (
    <>

<StepTitle plant={quotes.plant} stepNumber={1} checked noMargin>
        <I18n id="app.quoteObtaining.schedule.calendar.step1.title" />
      </StepTitle>
      <GreyStepBox withModify={true} modifyFunction={onModifyVehicleType}>
        <DateSelected>
          <b>Tipo de vehiculo:</b>{" "}
          {vehicleType}
        </DateSelected>
      </GreyStepBox>
      <StepTitle plant={quotes.plant} checked stepNumber={2}>
        <I18n id="app.quoteObtaining.schedule.calendar.step2.title" />
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

      {quotes.plant !== "sanmartin" && (
        <>
          <StepTitle plant={quotes.plant} checked stepNumber={3}>
            <I18n id="app.quoteObtaining.schedule.calendar.step3.title" />
          </StepTitle>

          <GreyStepBox
            withModify={true}
            modifyFunction={onModifyPaymentPlatform}
          >
            <ImgContainer>
              <Image
                className="platform"
                src={getImageByPlatform(paymentPlatform)}
                alt="pepe"
                width="200"
                height="65"
              />
            </ImgContainer>
          </GreyStepBox>
        </>
      )}

      <StepTitle
        plant={quotes.plant}
        stepNumber={getGiveEmailStepNumber(quotes.plant)}
      >
        <I18n id={`app.quoteObtaining.schedule.calendar.step${getGiveEmailStepNumber(quotes.plant)}.title`} />
      </StepTitle>

      <GreyStepBox>
        <>
          <ChooseMessage>
            <I18n id="app.quoteObtaining.schedule.calendar.emailConf.subtitle" />
          </ChooseMessage>
          <div style={{width: "100%", height: "25px"}}></div>
          <InputSection>
            <InputLabel>
              Dominio (sin guiones):
            </InputLabel>
            <TextInput
              value={localDominio}
              onChange={(e) => onChangeDominio(e.target.value)}
              width={250}
            ></TextInput>
          </InputSection>
          <InputSection>
          <InputLabel>
              Email:
            </InputLabel>
            <TextInput
              value={localEmail}
              onChange={(e) => onChangeEmail(e.target.value)}
              width={250}
            ></TextInput>
          </InputSection>
          <InputSection>
          <InputLabel>
              Telefono:
            </InputLabel>
            <TextInput
            type="number"
              value={localTelefono}
              onChange={(e) => onChangeTelefono(e.target.value)}
              width={250}
            ></TextInput>
          </InputSection>
          <br/>
          <InputSection>
          <InputLabel>
              Combustible:
            </InputLabel>
         {fuelTypeList.map((fuelType)=> {
           return (
            <RadioSection>
              <RadioSectionLabel htmlFor={fuelType}>{fuelType}</RadioSectionLabel>
              <input onClick={() => onChangeFuelType(fuelType)} type="radio" id={fuelType} name="fuelType" value={fuelType} checked></input>
            </RadioSection>
           )
         })}
          </InputSection>
          <BtnContainer>
            <Btn
              plant={quotes.plant}
              disabled={!validEmailFormat || !validDominioFormat || !validTelefonoFormat || !validFuelTypeFormat}
              onClick={() => onSubmitPersonalInfo(localEmail, localDominio, localTelefono, localFuelType)}
            >
              <I18n id="app.quoteObtaining.schedule.calendar.continue" />
            </Btn>
          </BtnContainer>
        </>
      </GreyStepBox>
    </>
  );
}

export default GivePersonalInfo;
