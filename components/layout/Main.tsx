import React from 'react';
import useQuoteObtaining from '../../hooks/useQuoteObtaining';
import ViewWrapper from './common/layout/structure/ViewWrapper';
import Message from './common/layout/message';
import ErrorMessae from './common/error/ErrorMessage';

function Main(): JSX.Element {
    const [, QuoteObtaining]= useQuoteObtaining();
    return (
        <ViewWrapper >
            <Message type="ERROR">
                <ErrorMessage />
            </Message>
        </ViewWrapper>
    )
}

export default Main
