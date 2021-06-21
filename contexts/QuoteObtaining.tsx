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

export interface IQuote {
  id: number;
  fecha: string;
  hora: string;
}

export interface IQuoteObtaining {
  id: string;
  plant: string;
  tipo_vehiculo: string;
  precio: number;
  turnos: IQuote[];
  dias: string[];
}

export interface IQuoteObtainingError {
  reason: string;
}

interface QuoteObtainingProviderProps {
  id: string;
  children: ReactNode;
  plant: string;
}

const emptyQuoteSelected = { id: -1, fecha: "", hora: "" };

export type QuoteObtainingContextValue = [
  {
    error: ApolloError;
    quotes: IQuoteObtaining;
    quoteSelected: IQuote;
    dateSelected: boolean;
  },
  {
    onSelectDate: (id: number, fecha: string, hora: string) => void;
    onModifyDateAddressChange: () => void;
    resetShift: () => void;
  }
];

export const QuoteObtainingContext = createContext<QuoteObtainingContextValue>([
  { error: null, quotes: null, quoteSelected: null, dateSelected: null },
  {
    onSelectDate: (id: number, fecha: string, hora: string) => null,
    onModifyDateAddressChange: () => null,
    resetShift: () => null,
  },
]);

export const emptyQuoteObtainingError = {
  reason: "default",
};

export default function QuoteObtainingProvider({
  id,
  plant,
  children,
}: QuoteObtainingProviderProps): JSX.Element {
  const [quoteSelected, setQuoteSelected] =
    useState<IQuote>(emptyQuoteSelected);

  const [dateSelected, setDateSelected] = useState<boolean>(false);

  const {
    loading: loadingQuery,
    error: errorQuery,
    data,
  } = useQuery(getQuoteData, {
    variables: { id: id, plant: plant },
  });

  const onSelectDate = (id: number, fecha: string, hora: string): void => {
    setQuoteSelected({ id, fecha, hora });
    setDateSelected(true);
  };

  const onModifyDateAddressChange = () => {
    setDateSelected(false);
  };

  const resetShift = () => {
    setQuoteSelected({...quoteSelected,hora: null})
  };

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
      {
        error: errorQuery,
        quotes: data?.quotes,
        quoteSelected,
        dateSelected,
      },
      { onSelectDate, onModifyDateAddressChange,resetShift },
    ],
    [
      errorQuery,
      data?.quotes,
      quoteSelected,
      dateSelected,
      onSelectDate,
      onModifyDateAddressChange,
      resetShift
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
