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
  name?:string;
  hasProducts?: boolean;
}

function ViewWrapper({ children, name, hasProducts }: ViewWrapperProps): JSX.Element {
  const [{plant,operation}]=useQuoteObtaining();


  return (
    <MainContainer>
      <MainTitle>
        <I18n id={`app.quoteObtaining.${name || plant || 'default'}.main.chooseQuote.title`} />
      </MainTitle>
      <MainFlexContainer>
        <ScheduleContainer>{children}</ScheduleContainer>
      </MainFlexContainer>
    </MainContainer>
  );
}

export default ViewWrapper;