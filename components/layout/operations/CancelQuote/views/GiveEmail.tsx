import React, {useState,useEffect} from "react";
import I18n from "components/common/i18n";
import GreyStepBox from "components/common/GreyStepBox";
import StepTitle from "components/common/StepTitle";
import { capitalizeFirstChar, getStringDate } from "lib/commonFunctions";
import styled from "styled-components";
import Image from "next/image";
import useQuoteObtaining from "hooks/useQuoteObtaining";
import { ICancelQuoteObtaining } from "contexts/QuoteObtaining";
import LoaderG from "components/common/LoaderG";

const LoadingContainer = styled.div`
  min-height: 290px;
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
    props.plant === "rivadavia" || props.plant === "sanmartin" || props.plant==='godoycruz'
      ? "#052c33"
      : "rgb(116,172,223)"};
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

function GiveEmail(): JSX.Element {
  const [
    { cancellingQuote, plant, email, loading },
    {
      onModifyDateAddressChange,
      onSubmitEmail,
    },
  ] = useQuoteObtaining();

  useEffect(()=>{
    onChangeEmail(email);
  }, [email])

  const [localEmail,setLocalEmail] = useState(email);
  const [validEmailFormat, setValidEmailFormat] = useState(false);

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
  if (loading) {
    return (
      <LoaderG loading noBackground>
        <LoadingContainer />
      </LoaderG>
    );
  }
  if(cancellingQuote)
  return (
    <>
      <StepTitle plant={plant} noMargin checked stepNumber={1}>
        <I18n id="app.quoteCancelling.checked.title" />
      </StepTitle>
      <GreyStepBox withModify={false}>
        <DateSelected>
          <b>Fecha:</b>{" "}
          {capitalizeFirstChar(getStringDate(cancellingQuote.quote.fecha))}
          {"."}
          <br />
          <b>Hora:</b> {cancellingQuote.quote.hora.substr(0, 5)}
        </DateSelected>
      </GreyStepBox>

      <StepTitle plant={plant} stepNumber={1}>
        <I18n id="app.quoteObtaining.schedule.calendar.step3.title" />
      </StepTitle>

      <GreyStepBox>
        <>
          <ChooseMessage>
            <I18n id="app.quoteObtaining.schedule.calendar.emailConf.subtitle" />
          </ChooseMessage>

          <TextInput
            value={localEmail}
            onChange={(e) => onChangeEmail(e.target.value)}
            width={250}
          ></TextInput>

          <BtnContainer>
            <Btn
              plant={plant}
              disabled={!validEmailFormat}
              onClick={() => onSubmitEmail(localEmail)}
            >
              <I18n id="app.quoteObtaining.schedule.calendar.continue" />
            </Btn>
          </BtnContainer>
        </>
      </GreyStepBox>
    </>
  );
  else return null;
}

export default GiveEmail;
