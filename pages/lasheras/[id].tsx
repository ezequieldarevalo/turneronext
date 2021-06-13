import React from 'react';
import {useRouter} from 'next/router';
import Main from '../components/Main';
import QuoteObtainingProvider from 'contexts/QuoteObtaining';

function QuoteObtainingLhPage(): JSX.Element {
    const {
        query: {id}
    } = useRouter();

    return (<QuoteObtainingProvider id={id.toString()}>
        <Main />
    </QuoteObtainingProvider>
    )
}