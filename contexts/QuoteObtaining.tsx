import React, { useCallback, useState, useMemo, createContext } from "react";
import type { ReactNode } from "react";
import styled from "styled-components";
import { ApolloError } from "@apollo/client";
import { useQuery, useMutation, FetchResult } from "@apollo/react-hooks";

import getQuoteData from "../lib/queries/getQuoteData";
import doReschedule from "../lib/queries/doReschedule";
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

export interface IRescheduleResponse {
  done: boolean;
}

const emptyQuoteSelected = { id: -1, fecha: "", hora: "" };

export type QuoteObtainingContextValue = [
  {
    error: ApolloError;
    quotes: IQuoteObtaining;
    quoteSelected: IQuote;
    dateSelected: boolean;
    paymentPlatform: string;
    paymentPlatformSelected: boolean;
    email: string;
    emailEntered: boolean;
    loadingSchedule: boolean;
  },
  {
    onSelectDate: (id: number, fecha: string, hora: string) => void;
    onModifyDateAddressChange: () => void;
    resetShift: () => void;
    onChangePaymentPlatform: (paymentPlatform: string) => void;
    onSubmitPaymentPlatform: () => void;
    onModifyPaymentPlatform: () => void;
    onChangeEmail: (email: string) => void;
    onModifyEmail: () => void;
    onSubmitEmail: () => void;
    onSubmit: (
      email: string,
      quoteId: number,
      tipoVehiculo: string,
      rtoId: number,
      paymentMethod: string
    ) => Promise<FetchResult<IRescheduleResponse>>;
  }
];

export const QuoteObtainingContext = createContext<QuoteObtainingContextValue>([
  {
    error: null,
    quotes: null,
    quoteSelected: null,
    dateSelected: null,
    paymentPlatform: null,
    paymentPlatformSelected: null,
    email: null,
    emailEntered: null,
    loadingSchedule: null,
  },
  {
    onSelectDate: (id: number, fecha: string, hora: string) => null,
    onModifyDateAddressChange: () => null,
    resetShift: () => null,
    onChangePaymentPlatform: () => null,
    onSubmitPaymentPlatform: () => null,
    onModifyPaymentPlatform: () => null,
    onChangeEmail: () => null,
    onModifyEmail: () => null,
    onSubmitEmail: () => null,
    onSubmit: () => Promise.reject(),
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

  const [paymentPlatform, setPaymentPlatform] = useState<string>("yacare");

  const [paymentPlatformSelected, setPaymentPlatformSelected] =
    useState<boolean>(false);

  const [email, setEmail] = useState<string>("");

  const [emailEntered, setEmailEntered] = useState<boolean>(false);

  const {
    loading: loadingQuery,
    error: errorQuery,
    data,
  } = useQuery(getQuoteData, {
    variables: { id: id, plant: plant },
  });

  const [doResc, { error: errorMutation, loading: loadingSchedule }] =
    useMutation<IRescheduleResponse>(doReschedule, {
      onError: () => {
        return;
      },
    });

  const onSelectDate = (id: number, fecha: string, hora: string): void => {
    setQuoteSelected({ id, fecha, hora });
    setDateSelected(true);
  };

  const onModifyDateAddressChange = () => {
    setDateSelected(false);
  };

  const resetShift = () => {
    setQuoteSelected({ ...quoteSelected, hora: null });
  };

  const onChangePaymentPlatform = (paymentPlatform: string) => {
    setPaymentPlatform(paymentPlatform);
  };

  const onSubmitPaymentPlatform = () => {
    setPaymentPlatformSelected(true);
  };

  const onModifyPaymentPlatform = () => {
    setPaymentPlatformSelected(false);
  };

  const onChangeEmail = (email: string) => {
    setEmail(email);
  };

  const onModifyEmail = () => {
    setEmailEntered(false);
  };

  const onSubmitEmail = () => {
    setEmailEntered(true);
  };

  const onSubmit = useCallback(
    (
      email: string,
      quoteId: number,
      tipoVehiculo: string,
      rtoId: number,
      paymentMethod: string
    ): Promise<FetchResult<IRescheduleResponse>> =>
      doResc({
        variables: {
          email,
          quoteId,
          tipoVehiculo,
          rtoId,
          paymentMethod,
        },
      }),
    []
  );

  const value: QuoteObtainingContextValue = useMemo(
    () => [
      {
        error: errorQuery,
        quotes: data?.quotes,
        quoteSelected,
        dateSelected,
        paymentPlatform,
        paymentPlatformSelected,
        email,
        emailEntered,
        loadingSchedule,
      },
      {
        onSelectDate,
        onModifyDateAddressChange,
        resetShift,
        onChangePaymentPlatform,
        onSubmitPaymentPlatform,
        onModifyPaymentPlatform,
        onChangeEmail,
        onModifyEmail,
        onSubmitEmail,
        onSubmit,
      },
    ],
    [
      errorQuery,
      data?.quotes,
      quoteSelected,
      dateSelected,
      paymentPlatform,
      paymentPlatformSelected,
      email,
      emailEntered,
      loadingSchedule,
      onSelectDate,
      onModifyDateAddressChange,
      resetShift,
      onChangePaymentPlatform,
      onSubmitPaymentPlatform,
      onModifyPaymentPlatform,
      onChangeEmail,
      onModifyEmail,
      onSubmitEmail,
      onSubmit,
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
