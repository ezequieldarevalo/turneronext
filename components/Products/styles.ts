import styled from 'styled-components';

export const ProductsContainer = styled.div`
  margin-top: 1px;
  padding: 17px 25px 23px 21px;
  width: 30%;
  border: solid 1px #dadada;
  @media (max-width: 996px) {
    padding: 0;
    border: 0;
    width: 100%;
    margin-top: 25px;
    margin-bottom: 25px;
  }
`;

export const Title = styled.div`
  font-family: Nunito-SemiBold;
  font-size: 25px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: -0.32px;
  color: #000000;
  @media (max-width: 996px) {
    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.75;
    letter-spacing: -0.29px;
    color: #000000;
  }
`;

export const ProductsList = styled.div`
  margin-top: 9px;
  width: 100%;
  padding: 17px 12px 0 4px;
  background-color: #f9f9f9;
`;

export const Product = styled.div`
  position: relative;
  display: flex;
`;

export const Image = styled.div`
  min-height: 74px;
  max-height: 74px;
  min-width: 74px;
  margin: 0 0 16px 21px;
  display: block;
  img {
    width: 74px;
    height: 74px;
    font-size: 8px;
  }
`;

export const Description = styled.div`
  margin: 6px 0 36px 18px;
  font-family: Nunito-SemiBold;
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: -0.27px;
  color: #000000;
`;
