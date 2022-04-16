import React, {
  useCallback,
  useState,
  useMemo,
  createContext,
} from "react";
import type { ReactNode } from "react";
import styled from "styled-components";
import { ApolloError } from "@apollo/client";
import { useLazyQuery, useMutation, FetchResult } from "@apollo/react-hooks";

import getQuoteData from "../lib/queries/getQuoteData";
import doReschedule from "../lib/queries/doReschedule";
import doDateChange from "../lib/queries/doChangeDate";
import doCancelQuote from "../lib/queries/doCancelQuote";
import LoaderG from "../components/common/LoaderG";
import { fuelTypeList } from 'lib/constants'

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
    nombre: string;
    anio: string;
    email: string;
    dominio: string;
    telefono: string;
    fuelType: string;
    emailEntered: boolean;
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
    onModifyEmail: () => void;
    onModifyPersonalInfo: () => void;
    onSubmitEmail: (email:string) => void;
    onSubmitPersonalInfo: (nombre: string, anio: string, email:string, dominio:string, telefono:string, fuelType:string) => void;
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
    nombre: null,
    anio: null,
    email: null,
    dominio: null,
    telefono: null,
    fuelType: null,
    emailEntered: null,
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
    onModifyEmail: () => null,
    onModifyPersonalInfo: () => null,
    onSubmitEmail: () => null,
    onSubmitPersonalInfo: () => null,
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

  const [vehicleType, setVehicleType] = useState<string>('AUTO PARTICULAR');

  const [vehicleTypeSelected, setVehicleTypeSelected] = useState<boolean>(false);

  const [dateSelected, setDateSelected] = useState<boolean>(false);

  const [paymentPlatform, setPaymentPlatform] = useState<string>("yacare");

  const [paymentPlatformSelected, setPaymentPlatformSelected] =
    useState<boolean>(false);

  const [nombre, setNombre] = useState<string>("");

  const [anio, setAnio] = useState<string>("");

  const [email, setEmail] = useState<string>("");

  const [dominio, setDominio] = useState<string>("");

  const [telefono, setTelefono] = useState<string>("");

  const [fuelType, setFuelType] = useState<string>(fuelTypeList[0]);

  const [emailEntered, setEmailEntered] = useState<boolean>(false);

  const [personalInfoEntered, setPersonalInfoEntered] = useState<boolean>(false);

  const [showError, setShowError] = useState<boolean>(false);

  const [chooseQuoteDone, setChooseQuoteDone] = useState<boolean>(false);

  const [changeDateDone, setChangeDateDone] = useState<boolean>(false);

  const [cancelQuoteDone, setCancelQuoteDone] = useState<boolean>(false);


  const [getQuotes, {loading: loadingQuery, error: errorQuery, data: quotesData}] =
    useLazyQuery<IQuoteObtainingResponse>(getQuoteData,{onCompleted: () => setVehicleTypeSelected(true), fetchPolicy: 'no-cache'});

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

  const onSelectVehicleType = useCallback((type: string):Promise<
  FetchResult<IQuoteObtainingResponse>> => {
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

  const onModifyEmail = () => {
    setEmailEntered(false);
    setShowError(false);
  };

  const onModifyPersonalInfo = () => {
    setPersonalInfoEntered(false);
    setShowError(false);
  };

  const onSubmitPersonalInfo = (nombre: string, anio: string, email: string, dominio:string, telefono: string, fuelType:string) => {
    setNombre(nombre);
    setAnio(anio);
    setEmail(email);
    setDominio(dominio);
    setTelefono(telefono);
    setFuelType(fuelType);
    setPersonalInfoEntered(true);
  };

  const onSubmitEmail = (email: string) => {
    setEmail(email);
    setEmailEntered(true);
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
        nombre,
        dominio,
        telefono,
        anio,
        combustible: fuelType,
        quoteId: quoteSelected.id,
        tipoVehiculo: quotesData?.quotes.tipo_vehiculo,
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
        nombre,
        anio,
        email,
        dominio,
        telefono,
        fuelType,
        emailEntered,
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
        onModifyEmail,
        onModifyPersonalInfo,
        onSubmitEmail,
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
      nombre,
      anio,
      email,
      dominio,
      telefono,
      fuelType,
      emailEntered,
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
      onSubmitEmail,
      onModifyEmail,
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
