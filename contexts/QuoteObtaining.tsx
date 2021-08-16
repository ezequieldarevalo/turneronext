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
import doDateChange from "../lib/queries/doChangeDate";
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
  fecha?: string;
  hora?: string;
}

export interface IQuoteObtainingError {
  saleChannel?: string;
  status?: string;
  reason: string;
}

interface QuoteObtainingProviderProps {
  id: string;
  children: ReactNode;
  plant: string;
  operation: string;
}

export interface IRescheduleResponseReschedule {
  url_pago: string;
}

export interface IDateChangeResponseReschedule {
  done: boolean;
}

interface IRescheduleResponse {
  Reschedule: IRescheduleResponseReschedule
}

export interface ISchedulingError {
  saleChannel?: string;
  reason: string;
  date?: string;
  shift?: string;
  canRetry?: boolean;
}

export const emptySchedulingError: ISchedulingError = {
  reason: 'default',
};


const emptyQuoteSelected = { id: null, fecha: "", hora: "" };

export type QuoteObtainingContextValue = [
  {
    error: ApolloError;
    quotes: IQuoteObtaining;
    operation: string;
    quoteSelected: IQuote;
    dateSelected: boolean;
    paymentPlatform: string;
    paymentPlatformSelected: boolean;
    email: string;
    emailEntered: boolean;
    loading: boolean;
    validEmailFormat: boolean;
    showError: boolean;
    changeDateDone: boolean;
    chooseQuoteDone: boolean;
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
    operation: null,
    quoteSelected: null,
    dateSelected: null,
    paymentPlatform: null,
    paymentPlatformSelected: null,
    email: null,
    emailEntered: null,
    loading: null,
    validEmailFormat: null,
    showError: null,
    changeDateDone: null,
    chooseQuoteDone: null,
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
  operation,
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

  const [showError,setShowError] = useState<boolean>(false);

  const [chooseQuoteDone,setChooseQuoteDone] = useState<boolean>(false);

  const [changeDateDone,setChangeDateDone] = useState<boolean>(false);

  const {
    loading: loadingQuery,
    error: errorQuery,
    data,
  } = useQuery(getQuoteData, {
    variables: { id: id, plant: plant, operation: operation },
  });

  const [doResc, { error: errorMutation, loading: loadingSchedule }] =
    useMutation<IRescheduleResponse>(doReschedule, {
      onError: () => {
        setShowError(true);
      },
      onCompleted: (data)=> {
        if(plant==='sanmartin')
          setChooseQuoteDone(true)
        else
          window.location.href=data.Reschedule.url_pago;
      }
    });

  const [doChDate, { error: errorChangeDate, loading: loadingChangeDate }] =
    useMutation<IRescheduleResponse>(doDateChange, {
      onError: () => {
        setShowError(true);
      },
      onCompleted: (data)=> {
        setChangeDateDone(true)
      }
    });

  const onSelectDate = (id: number, fecha: string, hora: string): void => {
    setQuoteSelected({ id, fecha, hora });
    setDateSelected(true);
  };

  const onModifyDateAddressChange = () => {
    setDateSelected(false);
    setShowError(false);
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
    setShowError(false);
  };

  const onChangeEmail = (email: string) => {
    if(/^[-\w.%+]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,125}[a-zA-Z]{2,63}$/.test(email)) setValidEmailFormat(true)
    else setValidEmailFormat(false) 
    setEmail(email);
  };

  const onModifyEmail = () => {
    setEmailEntered(false);
    setShowError(false);
  };

  const onSubmitEmail = () => {
    if(validEmailFormat) setEmailEntered(true);
  };

  const onSubmit = useCallback((): Promise<
    FetchResult<IRescheduleResponse>
  > => {
    let variables={};
    if(operation==='chooseQuote'){
      variables={
        plant,
        email,
        quoteId: quoteSelected.id,
        tipoVehiculo: data?.quotes.tipo_vehiculo,
        rtoId: data?.quotes.id,
        paymentMethod: paymentPlatform,
      };
      return doResc({
        variables
      });
    }
    else {
      variables={
        plant,
        email,
        quoteId: quoteSelected.id,
        oldQuoteId: data.quotes.id,
      }
      return doChDate({
        variables
      });
    }
    
  }, [plant, email, quoteSelected, data, paymentPlatform]);

  const error=errorQuery || errorMutation || errorChangeDate;

  const loading=loadingSchedule || loadingChangeDate;

  const value: QuoteObtainingContextValue = useMemo(
    () => [
      {
        error,
        quotes: data?.quotes,
        operation,
        quoteSelected,
        dateSelected,
        paymentPlatform,
        paymentPlatformSelected,
        email,
        emailEntered,
        loading,
        validEmailFormat,
        showError,
        changeDateDone,
        chooseQuoteDone,
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
      error,
      data?.quotes,
      quoteSelected,
      dateSelected,
      paymentPlatform,
      paymentPlatformSelected,
      email,
      emailEntered,
      loading,
      validEmailFormat,
      showError,
      changeDateDone,
      chooseQuoteDone,
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
