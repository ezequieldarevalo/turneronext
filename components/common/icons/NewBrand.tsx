import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const BrandContainer = styled.div`
  position: absolute;
  bottom: 21px;
  height: 26px;
  width: 161px;
`;

function NewBrand(): JSX.Element {
  return (
    <BrandContainer>
      <Image src="/img/brand.png" alt="Picture of the author" layout="fill" />
    </BrandContainer>
  );
}

export default NewBrand;
