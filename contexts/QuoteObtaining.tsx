import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  createContext,
} from "react";
import type { ReactNode } from "react";
import styled from "styled-components";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { useMutation, FetchResult } from "@apollo/react-hooks";

import getQuoteData from "../lib/queries/getQuoteData";
import doReschedule from "../lib/queries/doReschedule";
import doDateChange from "../lib/queries/doChangeDate";
import doCancelQuote from "../lib/queries/doCancelQuote";
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
  plant: string;
  tipo_vehiculo: string;
  precio: number;
  dias: string[];
  turnos: IQuote[];
  fecha?: string;
  hora?: string;
}

export interface IQuoteObtainingResponse {
  quotes: IQuoteObtaining
}

export interface IQuoteObtainingError {
  saleChannel?: string;
  status?: string;
  reason: string;
}

interface QuoteObtainingProviderProps {
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

export interface ICancelQuoteResponseReschedule {
  done: boolean;
}

interface IRescheduleResponse {
  Reschedule: IRescheduleResponseReschedule;
}

export interface ISchedulingError {
  saleChannel?: string;
  reason: string;
  date?: string;
  shift?: string;
  canRetry?: boolean;
}

export const emptySchedulingError: ISchedulingError = {
  reason: "default",
};

const emptyQuoteSelected = { id: null, fecha: "", hora: "" };

export type QuoteObtainingContextValue = [
  {
    error: ApolloError;
    quotes: IQuoteObtaining;
    plant: string;
    operation: string;
    vehicleType: string;
    vehicleTypeSelected: boolean;
    quoteSelected: IQuote;
    dateSelected: boolean;
    paymentPlatform: string;
    paymentPlatformSelected: boolean;
    email: string;
    dominio: string;
    telefono: string;
    fuelType: string;
    personalInfoEntered: boolean;
    loading: boolean;
    showError: boolean;
    changeDateDone: boolean;
    chooseQuoteDone: boolean;
    cancelQuoteDone: boolean;
  },
  {
    onSelectVehicleType: (type:string) => void;
    onModifyVehicleType: () => void;
    onSelectDate: (id: number, fecha: string, hora: string) => void;
    onModifyDateAddressChange: () => void;
    resetShift: () => void;
    onChangePaymentPlatform: (paymentPlatform: string) => void;
    onSubmitPaymentPlatform: () => void;
    onModifyPaymentPlatform: () => void;
    onModifyPersonalInfo: () => void;
    onSubmitPersonalInfo: (email:string, dominio:string, telefono:string, fuelType:string) => void;
    onSubmit: () => Promise<FetchResult<IRescheduleResponse>>;
  }
];

export const QuoteObtainingContext = createContext<QuoteObtainingContextValue>([
  {
    error: null,
    quotes: null,
    plant: null,
    operation: null,
    vehicleType: null,
    vehicleTypeSelected: null,
    quoteSelected: null,
    dateSelected: null,
    paymentPlatform: null,
    paymentPlatformSelected: null,
    email: null,
    dominio: null,
    telefono: null,
    fuelType: null,
    personalInfoEntered: null,
    loading: null,
    showError: null,
    changeDateDone: null,
    chooseQuoteDone: null,
    cancelQuoteDone: null,
  },
  {
    onSelectVehicleType: (type: string) => null,
    onModifyVehicleType: () => null,
    onSelectDate: (id: number, fecha: string, hora: string) => null,
    onModifyDateAddressChange: () => null,
    resetShift: () => null,
    onChangePaymentPlatform: () => null,
    onSubmitPaymentPlatform: () => null,
    onModifyPaymentPlatform: () => null,
    onModifyPersonalInfo: () => null,
    onSubmitPersonalInfo: () => null,
    onSubmit: () => Promise.reject(),
  },
]);

export const emptyQuoteObtainingError = {
  reason: "default",
};

export default function QuoteObtainingProvider({
  plant,
  operation,
  children,
}: QuoteObtainingProviderProps): JSX.Element {
  const [quoteSelected, setQuoteSelected] =
    useState<IQuote>(emptyQuoteSelected);

  const [vehicleType, setVehicleType] = useState<string>('AUTO PARTICULAR');

  const [vehicleTypeSelected, setVehicleTypeSelected] = useState<boolean>(false);

  const [dateSelected, setDateSelected] = useState<boolean>(false);

  const [paymentPlatform, setPaymentPlatform] = useState<string>("yacare");

  const [paymentPlatformSelected, setPaymentPlatformSelected] =
    useState<boolean>(false);

  const [email, setEmail] = useState<string>("");

  const [dominio, setDominio] = useState<string>("");

  const [telefono, setTelefono] = useState<string>("");

  const [fuelType, setFuelType] = useState<string>("");

  const [personalInfoEntered, setPersonalInfoEntered] = useState<boolean>(false);

  const [showError, setShowError] = useState<boolean>(false);

  const [chooseQuoteDone, setChooseQuoteDone] = useState<boolean>(false);

  const [changeDateDone, setChangeDateDone] = useState<boolean>(false);

  const [cancelQuoteDone, setCancelQuoteDone] = useState<boolean>(false);


  // const {
  //   loading: loadingQuery,
  //   error: errorQuery,
  //   data,
  // } = useQuery(getQuoteData, {
  //   variables: { id: id, plant: plant, operation: operation },
  // });

  const [getQuotes, {loading: loadingQuery, error: errorQuery, data: quotesData}] =
    useLazyQuery<IQuoteObtainingResponse>(getQuoteData,{onCompleted: () => setVehicleTypeSelected(true)});

  const [doResc, { error: errorMutation, loading: loadingSchedule }] =
    useMutation<IRescheduleResponse>(doReschedule, {
      onError: () => {
        setShowError(true);
      },
      onCompleted: (data) => {
        if (plant === "sanmartin") setChooseQuoteDone(true);
        else window.location.href = data.Reschedule.url_pago;
      },
    });

  const [doChDate, { error: errorChangeDate, loading: loadingChangeDate }] =
    useMutation<IRescheduleResponse>(doDateChange, {
      onError: () => {
        setShowError(true);
      },
      onCompleted: (data) => {
        setChangeDateDone(true);
      },
    });

  const [doCanQuote, { error: errorCancelQuote, loading: loadingCancelQuote }] =
    useMutation<IRescheduleResponse>(doCancelQuote, {
      onError: () => {
        setShowError(true);
      },
      onCompleted: (data) => {
        setCancelQuoteDone(true);
      },
    });

  const onSelectVehicleType = useCallback((type: string):void => {
    setVehicleType(type);
    return getQuotes({variables: {vehicleType: type, plant, operation}});
  }, []);

  const onSelectDate = (id: number, fecha: string, hora: string): void => {
    setQuoteSelected({ id, fecha, hora });
    setDateSelected(true);
  };

  const onModifyVehicleType = () => {
    setVehicleTypeSelected(false);
    setShowError(false);
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

  const onModifyPersonalInfo = () => {
    setPersonalInfoEntered(false);
    setShowError(false);
  };

  const onSubmitPersonalInfo = (email: string, dominio:string, telefono: string, fuelType:string) => {
    setEmail(email);
    setDominio(dominio);
    setTelefono(telefono);
    setFuelType(fuelType);
    setPersonalInfoEntered(true);
  };

  const onSubmit = useCallback((): Promise<
    FetchResult<IRescheduleResponse>
  > => {
    let variables = {};
    if (operation === "cancelQuote") {
      variables = {
        plant,
        email,
        // quoteId: data.quotes.id,
      };
      return doCanQuote({
        variables,
      });
    }
    if (operation === "chooseQuote") {
      variables = {
        plant,
        email,
        quoteId: quoteSelected.id,
        // tipoVehiculo: data?.quotes.tipo_vehiculo,
        // rtoId: data?.quotes.id,
        paymentMethod: paymentPlatform,
      };
      return doResc({
        variables,
      });
    }
    variables = {
      plant,
      email,
      quoteId: quoteSelected.id,
      // oldQuoteId: data.quotes.id,
    };
    return doChDate({
      variables,
    });
  // }, [plant, email, quoteSelected, data, paymentPlatform]);
}, [plant, email, quoteSelected, paymentPlatform]);

  const error =
   errorQuery || errorMutation || errorChangeDate || errorCancelQuote;

  const loading = loadingQuery || loadingSchedule || loadingChangeDate || loadingCancelQuote;

  const value: QuoteObtainingContextValue = useMemo(
    () => [
      {
        error,
        quotes: quotesData?.quotes,
        plant,
        operation,
        vehicleType,
        vehicleTypeSelected,
        quoteSelected,
        dateSelected,
        paymentPlatform,
        paymentPlatformSelected,
        email,
        dominio,
        telefono,
        fuelType,
        personalInfoEntered,
        loading,
        showError,
        changeDateDone,
        chooseQuoteDone,
        cancelQuoteDone,
      },
      {
        onSelectVehicleType,
        onModifyVehicleType,
        onSelectDate,
        onModifyDateAddressChange,
        resetShift,
        onChangePaymentPlatform,
        onSubmitPaymentPlatform,
        onModifyPaymentPlatform,
        onModifyPersonalInfo,
        onSubmitPersonalInfo,
        onSubmit,
      },
    ],
    [
      error,
      quotesData?.quotes,
      plant,
      quoteSelected,
      vehicleType,
      vehicleTypeSelected,
      dateSelected,
      paymentPlatform,
      paymentPlatformSelected,
      email,
      dominio,
      telefono,
      fuelType,
      personalInfoEntered,
      loading,
      showError,
      changeDateDone,
      chooseQuoteDone,
      cancelQuoteDone,
      onSelectVehicleType,
      onModifyVehicleType,
      onSelectDate,
      onModifyDateAddressChange,
      resetShift,
      onChangePaymentPlatform,
      onSubmitPaymentPlatform,
      onModifyPaymentPlatform,
      onModifyPersonalInfo,
      onSubmitPersonalInfo,
      onSubmit,
    ]
  );

  if (loading) {
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
