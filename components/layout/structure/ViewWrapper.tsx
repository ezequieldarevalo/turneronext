import React from 'react';
import {
  MainContainer,
  MainFlexContainer,
  MainTitle,
  ScheduleContainer,
} from '../../common/styles/MainStyles';
import I18n from 'components/common/i18n';

interface ViewWrapperProps {
  children: JSX.Element;
}

function ViewWrapper({ children }: ViewWrapperProps): JSX.Element {
  return (
    <MainContainer>
      <MainTitle>
        <I18n id="order.delivery.reschedule.main.title" />
      </MainTitle>
      <MainFlexContainer>
        <ScheduleContainer>{children}</ScheduleContainer>
        
      </MainFlexContainer>
    </MainContainer>
  );
}

export default ViewWrapper;