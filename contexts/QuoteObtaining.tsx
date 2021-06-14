import React, { useCallback, useState, useMemo, createContext } from "react";
import type { ReactNode } from "react";
import styled from "styled-components";
import { ApolloError } from "@apollo/client";
// import { useQuery, useMutation, FetchResult } from '@apollo/react-hooks';
import { useQuery } from "@apollo/react-hooks";

import getQuoteData from "../lib/queries/getQuoteData";
import LoaderG from "../components/common/LoaderG";

const LoadingContainer = styled.div`
  min-height: 290px;
`;

export interface IQuoteObtaining {
  id: string;
}

export interface IQuoteObtainingError {
  reason: string;
}

interface QuoteObtainingProviderProps {
  id: string;
  children: ReactNode;
  plant: string;
}

interface ISelectedDate {
  date: string;
  shift: string;
}

const emptySelectedDate = { date: "", shift: "" };

export type QuoteObtainingContextValue = [
  ApolloError,
  IQuoteObtaining,
  { onSelectDate: (date: string, shift: string) => void }
];

export const QuoteObtainingContext = createContext<QuoteObtainingContextValue>([
  null,
  null,
  { onSelectDate: (date:string,shift:string) => null },
]);

export const emptyQuoteObtainingError={
    reason: 'default'
}

export default function QuoteObtainingProvider({
  id,
  plant,
  children,
}: QuoteObtainingProviderProps): JSX.Element {
  const [selectedDate, setSelectedDate] =
    useState<ISelectedDate>(emptySelectedDate);

   

  const {
    loading: loadingQuery,
    error: errorQuery,
    data,
  } = useQuery(getQuoteData, {
    variables: { id:id, plant:plant },
  });

  const onSelectDate = (date: string, shift: string) => {};

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
    () => [errorQuery, data?.quotes, {onSelectDate}],
    [errorQuery, data?.quotes,onSelectDate]
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
