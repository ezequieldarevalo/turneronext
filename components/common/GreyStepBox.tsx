import React from 'react';
import styled from 'styled-components';

const ContainerGreyStepBox = styled.div`
  position: relative;
  margin-top: 31px;
  background: #f9f9f9;
  padding: 13px 24px 14px 22px;
  @media (max-width: 996px) {
    margin-top: 19px;
    padding: 13px 24px 12px 22px;
  }
`;

const Modify = styled.a`
  position: absolute;
  cursor: pointer;
  top: 13px;
  right: 24px;
  margin: 7px 0 0 0;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.2px;
  text-align: right;
  color: #006afd;
  z-index: 1;
  @media (max-width: 996px) {
    position: relative;
    display: block;
    width: 100%;
    top: 0;
    right: 0;
  }
`;

const ContainerChildren = styled.div`
  position: relative;
  z-index: 0;
  @media (max-width: 996px) {
    display: block;
    width: 100%;
  }
`;

interface GreyStepBoxProps {
  withModify?: boolean;
  modifyFunction?: () => void;
  children: JSX.Element;
}

function GreyStepBox({
  withModify,
  modifyFunction,
  children,
}: GreyStepBoxProps): JSX.Element {
  return (
    <ContainerGreyStepBox>
      <ContainerChildren>{children}</ContainerChildren>
      {withModify && (
        <Modify onClick={() => modifyFunction()}>Modificar</Modify>
      )}
    </ContainerGreyStepBox>
  );
}

export default GreyStepBox;
