import styled from 'styled-components';

export const MainContainer = styled.div`
  position: relative;
  background-color: #ffffff;
  max-width: 1280px;
  margin: auto;
  padding-left: 18px;
  padding-right: 10px;
  padding-top: 47px;
  @media (max-width: 1280px) {
    padding-left: 33px;
  }
  @media (max-width: 996px) {
    margin-top: 10px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 11px;
  }
`;

export const MainFlexContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const MainTitle = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 18px;
  font-family: Nunito-Bold;
  font-size: 28px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: -0.5px;
  color: #000000;
  @media (max-width: 996px) {
    padding-bottom: 20px;
    height: 33px;
    font-size: 20px;
    line-height: 1.65;
    letter-spacing: -0.36px;
    color: #000000;
  }
`;

export const ScheduleContainer = styled.div`
  position: relative;
  width: 65%;
  // background: red;
  font-family: Nunito-Regular;
  border-top: solid 1px #dadada;
  padding-right: 2px;
  padding-top: 32px;
  @media (max-width: 996px) {
    width: 100%;
  }
  @media (max-width: 996px) {
    border: none;
    padding-top: 20px;
  }
`;
