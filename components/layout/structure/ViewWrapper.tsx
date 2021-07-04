import React from 'react';
import {
  MainContainer,
  MainFlexContainer,
  MainTitle,
  ScheduleContainer,
} from '../../common/styles/MainStyles';
import I18n from 'components/common/i18n';
import useQuoteObtaining from 'hooks/useQuoteObtaining'
import Products from 'components/Products'

interface ViewWrapperProps {
  children: JSX.Element;
  hasProducts?: boolean;
  plant?: string;
}

function ViewWrapper({ children, hasProducts, plant }: ViewWrapperProps): JSX.Element {
  const [{quotes}]=useQuoteObtaining();


  return (
    <MainContainer>
      <MainTitle>
        <I18n id={`app.quoteObtaining.${quotes?.plant || plant || 'default'}.main.title`} />
      </MainTitle>
      <MainFlexContainer>
        <ScheduleContainer>{children}</ScheduleContainer>
        {hasProducts && <Products />}
      </MainFlexContainer>
    </MainContainer>
  );
}

export default ViewWrapper;