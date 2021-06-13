import styled from 'styled-components';

export const MessageContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: 26px 25px 0 25px;
  border-radius: 2px;
  border: solid 1px ${(props) => props.color};
`;

export const MessageContent = styled.div`
  padding-top: 2px;
  margin-left: 9px;
  font-family: Work Sans, sans-serif;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: -0.36px;
  color: #000000;
  @media (max-width: 996px) {
    font-size: 15px;
    line-height: 1.4;
    letter-spacing: -0.33px;
    color: #000000;
  }
`;
