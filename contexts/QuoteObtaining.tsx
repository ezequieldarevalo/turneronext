import React, { useCallback, useState, useMemo, createContext } from 'react';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { ApolloError } from '@apollo/client';
import { useQuery, useMutation, FetchResult } from '@apollo/react-hooks';

import getDeliveryData from '../lib/queries/getQuoteData';
import LoaderG from '../components/common/LoaderG';

const LoadingContainer = styled.div`
  min-height: 290px;
`;

// export interface IAvailableShift {
//   code: string;
//   description: string;
// }

// export interface IAvailableDate {
//   date: string;
//   availableShifts: IAvailableShift[];
// }

// export interface ICalendar {
//   id: string;
//   availableDates: IAvailableDate[];
// }

// export interface IProduct {
//   id: string;
//   description: string;
//   quantity: number;
//   url?: string;
//   image?: string;
// }

// export interface IDeliveryAddress {
//   street: string;
//   number: number;
//   city: string;
//   state: string;
//   zipCode: string;
//   floor?: string;
//   apartment?: string;
//   observations?: string;
//   geoLat?: number;
//   geoLong?: number;
// }

// interface ISaleChannel {
//   name: string;
// }

// interface ICustomer {
//   name: string;
//   email: string;
// }

export interface IQuoteObtaining {
  availdableDates: string;
}

export interface IQuoteObtainingError {
    reason: string;
  }

// export interface IRescheduleResponse {
//   done: boolean;
// }

// export enum TReason {
//   INVALID_ADDRESS = 'INVALID_ADDRESS',
//   DELIVERY_FAILED = 'DELIVERY_FAILED',
//   DELIVERY_DATE_CHANGED = 'DELIVERY_DATE_CHANGED',
//   OPTIONAL_DATE_CHANGE = 'OPTIONAL_DATE_CHANGE',
// }

// export interface ValidateSchedulingResult {
//   valid: boolean;
//   reason: TReason;
// }

interface QuoteObtainingProviderProps {
  id: string;
  children: ReactNode;
}

// export interface IRescheduleState {
//   done: boolean; // posible cambio/remove
//   date: string;
//   shift: string;
// }

// export interface ISchedulingError {
//   saleChannel?: string;
//   reason: string;
//   date?: string;
//   shift?: string;
//   canRetry?: boolean;
// }

// export const emptySchedulingError: ISchedulingError = {
//   reason: 'default',
// };



export type QuoteObtainingContextValue = [
  ApolloError,
  IQuoteObtaining,
  {
    
  }
];

export const QuoteObtainingContext = createContext<
  QuoteObtainingContextValue
>([
  null,
  null,
  {
    
  },
]);

const emptyDateChangeState = {
  done: false,
  date: '',
  shift: '',
};

export default function QuoteObtainingProvider({
  id,
  children,
}: QuoteObtainingProviderProps): JSX.Element {
//   const [dateChangeState, setDateChangeState] = useState<IRescheduleState>(
//     emptyDateChangeState
//   );

  const { loading: loadingQuery, error: errorQuery, data } = useQuery(
    getDeliveryData,
    {
      variables: { id: id },
    }
  );

//   const [
//     doResc,
//     { error: errorMutation, loading: loadingMutation },
//   ] = useMutation<IRescheduleResponse>(doReschedule, {
//     onError: () => {
//       return;
//     },
//   });

//   const error = errorQuery;

//   const onDateSubmit = useCallback(
//     (
//       id: string,
//       date: string,
//       shift: string
//     ): Promise<FetchResult<IRescheduleResponse>> =>
//       doResc({
//         variables: {
//           id,
//           date,
//           shift,
//         },
//       }),
//     []
//   );

//   const changeDate = useCallback((date: string, shift: string) => {
//     setDateChangeState({ done: true, date, shift });
//   }, []);

  const value: QuoteObtainingContextValue = useMemo(
    () => [
        errorQuery,
      data?.QuoteObtaining,
      {
     
      },
    ],
    [
        errorQuery,
      data?.QuoteObtaining,
    ]
  );

  if (loadingQuery) {
    return (
      <LoaderG loading noBackground>
        <LoadingContainer />
      </LoaderG>
    );
  }

  return (
    <QuoteObtainingContext.Provider value={value}>
      {children}
    </QuoteObtainingContext.Provider>
  );
}
