import React from 'react';
import { Title, IconStep, Text } from './styles/OperationsStyles';
import CheckedImage from './icons/CheckedImage';
import styled from 'styled-components';

const ContainerCheckedImage = styled.div`
  @media (max-width: 996px) {
    margin-left: -4px;
    margin-top: 1px;
  }
`;

interface StepTitleProps {
  disabled?: boolean;
  noMargin?: boolean;
  stepNumber: number;
  children: any;
  checked?: boolean;
}

function StepTitle({
  disabled,
  noMargin,
  stepNumber,
  children,
  checked,
}: StepTitleProps): JSX.Element {
  return (
    <Title noMargin={noMargin}>
      <IconStep disabled={disabled} checked={checked}>
        {checked ? (
          <ContainerCheckedImage>
            <CheckedImage />
          </ContainerCheckedImage>
        ) : (
          stepNumber
        )}
      </IconStep>
      <Text disabled={disabled} checked={checked}>
        {children}
      </Text>
    </Title>
  );
}

export default StepTitle;
