import {useContext} from 'react'
import { QuoteObtainingContext } from 'contexts/QuoteObtaining'
import type {QuoteObtainingContextValue} from 'contexts/QuoteObtaining'

export default function useQuoteObtaining(): QuoteObtainingContextValue{
    return useContext(QuoteObtainingContext);
}