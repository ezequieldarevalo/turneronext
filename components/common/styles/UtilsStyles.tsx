import styled from 'styled-components';

interface BtnBaseProps {
  disabled?: boolean;
}

export const BtnBase = styled.button`
  padding: 15px 28px 14px 27px;
  border-radius: 2px;
  background-color: ${(props: BtnBaseProps) =>
    props.disabled ? '#d2d2d2' : '#440099'};
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
  } ;
`;

interface MessageTitleProps {
  type: 'SUCCESS' | 'ERROR';
}

export const MessageTitle = styled.p`
  font-size: 17px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.41;
  // letter-spacing: -0.38px;
  color: ${(props: MessageTitleProps) =>
    props.type === 'SUCCESS' ? '#238d48' : '#b80000'};
`;

interface TextInputProps {
  fullWidth?: boolean;
  width?: number;
  boxHeight?: number;
  marginTop?: number;
}

export const TextInput = styled.input`
  width: ${(props: TextInputProps) =>
    props.fullWidth ? '100%' : props.width + 'px'};
  font-size: 15px;
  height: ${(props: TextInputProps) =>
    props.boxHeight ? props.boxHeight + 'px' : '40px'};
  border-radius: 2px;
  border: solid 1px #cccccc;
  background-color: #ffffff;
  padding-left: 8px;
`;

export const TextAutocompleteInput = styled.input`
  width: ${(props: TextInputProps) =>
    props.fullWidth ? '100%' : props.width - 16 + 'px'};
  height: ${(props: TextInputProps) =>
    props.boxHeight ? props.boxHeight + 'px' : '40px'};
  float: left;
  font-size: 15px;
  @media (max-width: 996px) {
    width: 88%;
  } ;
`;

interface TextAreaInputProps {
  fullWidth?: boolean;
  width?: number;
  boxHeight?: number;
  marginTop?: number;
}

export const TextAreaInput = styled.textarea`
  position: relative;
  width: ${(props: TextAreaInputProps) =>
    props.fullWidth ? '100%' : props.width + 'px'};
  font-size: 15px;
  height: ${(props: TextAreaInputProps) =>
    props.boxHeight ? props.boxHeight + 'px' : '40px'};
  border-radius: 2px;
  border: solid 1px #cccccc;
  background-color: #ffffff;
  padding: 15px 9px 12px 16px;
  overflow: hidden;
`;

export const ContainerAddressMap = styled.div`
  margin-top: 18px;
  height: 240px;
  background: #ffffff;
  border: solid 2px #e0e0e0;
  font-size: 15px;
  @media (max-width: 996px) {
    height: 138px;
  }
`;

interface IBtnProps {
  plant: string;
}

export const Btn = styled.button`
  padding: 15px 28px 14px 27px;
  border-radius: 2px;
  background-color: ${(props:IBtnProps) => props.plant==='rivadavia'? '#052c33' : 'rgb(116,172,223)'  };
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
`;
