import styled from 'styled-components';

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

interface IconStepProps {
  disabled?: boolean;
  checked?: boolean;
  plant: string;
}

export const IconStep = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50px;
  padding: 4px 6px 8px 8px;
  background: ${(props: IconStepProps) =>
    props.disabled || props.checked ? 'none' : props.plant==='rivadavia'? '#052c33' : 'rgb(116,172,223)' };
  border: 1px solid
    ${(props: IconStepProps) =>
      props.disabled || props.checked ? '#888888' : props.plant==='rivadavia'? '#052c33' : 'rgb(116,172,223)'};
  color: ${(props: IconStepProps) =>
    props.disabled || props.checked ? '#888888' : '#fff'};
  text-align: center;
  font-family: Nunito-Bold;
  font-size: 20px;
  font-weight: 600;
  @media (max-width: 996px) {
    width: 25px;
    height: 25px;
    opacity: 0.99;
    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 17px;
    letter-spacing: -0.29px;
    margin-top: 4px;
    padding-left: 7px;
  }
`;

interface TextProps {
  disabled?: boolean;
  checked?: boolean;
}

export const Text = styled.div`
  margin-left: 13px;
  font-family: Nunito-Bold;
  font-size: 22px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.8;
  letter-spacing: -0.39px;
  color: ${(props: TextProps) =>
    props.disabled || props.checked ? '#888888' : '#000'};
  @media (max-width: 996px) {
    font-size: 18px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.83;
    letter-spacing: -0.32px;
    color: #000000;
    margin-left: 11px;
  }
`;
