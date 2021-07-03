import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  createContext,
} from "react";
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
  id: number;
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

export interface IRescheduleResponseReschedule {
  url_pago: string;
}

interface IRescheduleResponse {
  Reschedule: IRescheduleResponseReschedule
}

const emptyQuoteSelected = { id: null, fecha: "", hora: "" };

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
    validEmailFormat: boolean;
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
    onSubmit: () => Promise<FetchResult<IRescheduleResponse>>;
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
    validEmailFormat: null,
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

  const [validEmailFormat, setValidEmailFormat] = useState<boolean>(false);

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
      onCompleted: (data)=> {
        console.log(data.Reschedule.url_pago)
        window.location.href=data.Reschedule.url_pago;
      }
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
    if(/^[-\w.%+]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,125}[a-zA-Z]{2,63}$/.test(email)) setValidEmailFormat(true)
    else setValidEmailFormat(false) 
    setEmail(email);
  };

  const onModifyEmail = () => {
    setEmailEntered(false);
  };

  const onSubmitEmail = () => {
    if(validEmailFormat) setEmailEntered(true);
  };

  const onSubmit = useCallback((): Promise<
    FetchResult<IRescheduleResponse>
  > => {
    return doResc({
      variables: {
        plant,
        email,
        quoteId: quoteSelected.id,
        tipoVehiculo: data?.quotes.tipo_vehiculo,
        rtoId: data?.quotes.id,
        paymentMethod: paymentPlatform,
      },
    });
  }, [plant, email, quoteSelected, data, paymentPlatform]);

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
        validEmailFormat
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
      validEmailFormat,
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
