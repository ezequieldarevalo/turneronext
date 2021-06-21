import React, { useCallback } from 'react';
import styled from 'styled-components';
import I18n from './i18n/I18n';

const ContainerShift = styled.label`
  display: flex;
  position: relative;
  padding-left: 35px;
  margin-bottom: 6px;
  cursor: pointer;
  font-size: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  line-height: 23px;
  :hover input ~ span {
    background-color: #ccc;
  }
`;

const InputShift = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  :checked ~ span {
    background-color: transparent;
  }
  :checked ~ span:after {
    display: block;
  }
`;

const CheckmarkShift = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 22px;
  width: 22px;
  background-color: #eee;
  border: 1px solid #979797;
  border-radius: 50%;
  :after {
    content: '';
    position: absolute;
    display: none;
    top: 3px;
    left: 3px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: rgb(116,172,223);
  }
`;

interface IProps {
  isFirst: boolean;
  shiftCode: string;
  onShiftChange: (string) => void;
}

function ShiftSelector({
  isFirst,
  shiftCode,
  onShiftChange,
}: IProps): JSX.Element {
  const handleChangeShift = useCallback((e) => {
    onShiftChange(e.target.value);
  }, []);

  return (
    <ContainerShift>
      {shiftCode}
      <InputShift
        type="radio"
        name="shift"
        defaultChecked={isFirst}
        value={shiftCode}
        onChange={handleChangeShift}
      />
      <CheckmarkShift />
    </ContainerShift>
  );
}

export default ShiftSelector;
