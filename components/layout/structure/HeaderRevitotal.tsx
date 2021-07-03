import React from 'react';
import styled from 'styled-components';
import NewBrand from '../../common/icons/NewBrand';

export default function HeaderRevitotal(): JSX.Element {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Brand>REVITOTAL</Brand>
      </HeaderContent>
    </HeaderContainer>
  );
}

const HeaderContent = styled.div`
  max-width: 1280px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  position: relative;
  @media (max-width: 996px) {
    padding-left: 0;
    justify-content: center;
    height: 60px;
    align-items: center;
  }
`;

const HeaderContainer = styled.div`
  position: sticky;
  background-color: rgb(116, 172, 223);
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  padding-left: 10px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.08);
  z-index: 10;
  @media (max-width: 996px) {
    height: 60px;
  }
  
`;

const Brand = styled.div`

  font-size: 25px;
  color: white;
  height: 70px;
  line-height: 70px;
  font-family: Nunito-SemiBold;
  font-size: 1.85rem;
  @media (max-width: 996px) {
    height: 60px;
    line-height: 60px;
  }
`;
