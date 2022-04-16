import getConfig from "next/config";
import type {
  IQuoteObtainingError,
  IQuoteObtaining,
  IRescheduleResponseReschedule,
  IDateChangeResponseReschedule,
  ICancelQuoteResponseReschedule
} from "../contexts/QuoteObtaining";
import { ApolloError } from "apollo-server-errors";

const BAD_REQUEST = "BAD_REQUEST";
const INTERNAL_ERROR_SERVER = "INTERNAL_ERROR_SERVER";
const UNKNOWN_ERROR = "UNKNOWN_ERROR";

interface GetQuoteDataArgs {
  vehicleType: string;
  id: string;
  plant: string;
  operation: string;
}

const getQuotes = "api/auth/getQuotes";
const CdGetQuotes = "api/auth/getQuotesForResc";
const confQuote = "api/auth/confQuote";
const changeDate = "api/auth/changeDate";
const cancelQuote = "api/auth/cancelQuote";
const origen = "T";

interface DoRescheduleArgs {
  plant: string;
  email: string;
  dominio: string;
  nombre: string;
  telefono: string;
  anio: string;
  combustible: string;
  quoteId: number;
  tipoVehiculo: string;
  paymentMethod: string;
  operation: string;
}

interface DateChangeArgs {
  plant: string;
  email: string;
  quoteId: number;
  oldQuoteId: number;
}

interface CancelQuoteArgs {
  plant: string;
  email: string;
  quoteId: number;
}

// const getSuffixByPlant = (operation: string, plant: string): string => {
//   if (operation === "chooseQuote") {
//     if (plant === "sanmartin") return getQuotes_sanmartin;
//     else return getQuotes;
//   } else return CdGetQuotes;
// };

const Query = {
  async getQuoteData(
    __parent: unknown,
    _args: GetQuoteDataArgs
  ): Promise<IQuoteObtaining> {
    let urlBackend = "";
    let urlSuffix = "";
    if (_args.operation === "chooseQuote") urlSuffix = getQuotes;
    else urlSuffix = CdGetQuotes;
    switch (_args.plant) {
      case "lasheras":
        urlBackend =
          getConfig().serverRuntimeConfig.lasherasBackendUrl + urlSuffix;
        break;
      case "maipu":
        urlBackend =
          getConfig().serverRuntimeConfig.maipuBackendUrl + urlSuffix;
        break;
      case "rivadavia":
        urlBackend =
          getConfig().serverRuntimeConfig.rivadaviaBackendUrl + urlSuffix;
        break;
      case "sanmartin":
        urlBackend =
          getConfig().serverRuntimeConfig.sanmartinBackendUrl + urlSuffix;
        break;
      case "godoycruz":
        urlBackend =
          getConfig().serverRuntimeConfig.godoycruzBackendUrl + urlSuffix;
        break;
      default:
        urlBackend = "error";
        break;
    }

    let bodyData = {};
    if (_args.operation === "chooseQuote")
      bodyData = {
        tipoVehiculo: _args.vehicleType,
      };
    else
      bodyData = {
        id_turno: _args.id,
      };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    };

    const response = await fetch(urlBackend, requestOptions);
    if (!response.ok) {
      if (response.status === 404) {
        const errorData: IQuoteObtainingError = await response.json();
        throw new ApolloError("", errorData.reason, {
          details: errorData,
        });
      }
      if (response.status === 400) {
        throw new ApolloError("", BAD_REQUEST, {
          details: {
            reason: BAD_REQUEST,
          },
        });
      }
      if (response.status === 500) {
        throw new ApolloError("", INTERNAL_ERROR_SERVER, {
          details: {
            reason: INTERNAL_ERROR_SERVER,
          },
        });
      }
      throw new ApolloError("", UNKNOWN_ERROR, {
        details: {
          reason: UNKNOWN_ERROR,
        },
      });
    } else {
      const data = await response.json();
      const result = { ...data, plant: _args.plant };
      return result;
    }
  },
};

const Mutation = {
  async doReschedule(
    __parent: unknown,
    _args: DoRescheduleArgs
  ): Promise<IRescheduleResponseReschedule> {
    let urlBackend = "";
    switch (_args.plant) {
      case "lasheras":
        urlBackend =
          getConfig().serverRuntimeConfig.lasherasBackendUrl + confQuote;
        break;
      case "maipu":
        urlBackend =
          getConfig().serverRuntimeConfig.maipuBackendUrl + confQuote;
        break;
      case "rivadavia":
        urlBackend =
          getConfig().serverRuntimeConfig.rivadaviaBackendUrl + confQuote;
        break;
      case "sanmartin":
        urlBackend =
          getConfig().serverRuntimeConfig.sanmartinBackendUrl + confQuote;
        break;
      case "godoycruz":
        urlBackend =
          getConfig().serverRuntimeConfig.godoycruzBackendUrl + confQuote;
        break;
      default:
        urlBackend = "error";
        break;
    }

    let bodyData = {};

    if (_args.plant !== "sanmartin")
      bodyData = {
        origen,
        email: _args.email,
        dominio: _args.dominio,
        nombre: _args.nombre,
        telefono: _args.telefono,
        anio: _args.anio,
        combustible: _args.combustible,
        id_turno: _args.quoteId,
        tipo_vehiculo: _args.tipoVehiculo,
        plataforma_pago: _args.paymentMethod,
      };
    else
      bodyData = {
        origen,
        email: _args.email,
        dominio: _args.dominio,
        nombre: _args.nombre,
        telefono: _args.telefono,
        anio: _args.anio,
        combustible: _args.combustible,
        id_turno: _args.quoteId,
        tipo_vehiculo: _args.tipoVehiculo,
      };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    };

    const response = await fetch(urlBackend, requestOptions);
    if (!response.ok) {
      if (response.status === 404) {
        const errorData = await response.json();

        throw new ApolloError("", errorData.reason, {
          details: errorData,
        });
      }
      if (response.status === 400) {
        throw new ApolloError("", BAD_REQUEST, {
          details: {
            saleChannel: "default",
            reason: BAD_REQUEST,
          },
        });
      }
      if (response.status === 500) {
        throw new ApolloError("", INTERNAL_ERROR_SERVER, {
          details: {
            saleChannel: "default",
            reason: INTERNAL_ERROR_SERVER,
          },
        });
      }
      throw new ApolloError("", UNKNOWN_ERROR, {
        details: {
          saleChannel: "default",
          reason: UNKNOWN_ERROR,
        },
      });
    } else {
      const data = await response.json();
      return data;
    }
  },
  async doChangeDate(
    __parent: unknown,
    _args: DateChangeArgs
  ): Promise<IDateChangeResponseReschedule> {
    let urlBackend = "";
    switch (_args.plant) {
      case "lasheras":
        urlBackend =
          getConfig().serverRuntimeConfig.lasherasBackendUrl + changeDate;
        break;
      case "maipu":
        urlBackend =
          getConfig().serverRuntimeConfig.maipuBackendUrl + changeDate;
        break;
      case "rivadavia":
        urlBackend =
          getConfig().serverRuntimeConfig.rivadaviaBackendUrl + changeDate;
        break;
      case "sanmartin":
          urlBackend =
            getConfig().serverRuntimeConfig.sanmartinBackendUrl + changeDate;
          break;
      case "godoycruz":
        urlBackend =
          getConfig().serverRuntimeConfig.godoycruzBackendUrl + changeDate;
        break;
      default:
        urlBackend = "error";
        break;
    }
    const bodyData = {
      email: _args.email,
      id_turno_nuevo: _args.quoteId,
      id_turno_ant: _args.oldQuoteId,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    };
    const response = await fetch(urlBackend, requestOptions);
    if (!response.ok) {
      if (response.status === 404) {
        const errorData: IQuoteObtainingError = await response.json();
        throw new ApolloError("", errorData.reason, {
          details: errorData,
        });
      }
      if (response.status === 400) {
        throw new ApolloError("", BAD_REQUEST, {
          details: {
            saleChannel: "default",
            reason: BAD_REQUEST,
          },
        });
      }
      if (response.status === 500) {
        throw new ApolloError("", INTERNAL_ERROR_SERVER, {
          details: {
            saleChannel: "default",
            reason: INTERNAL_ERROR_SERVER,
          },
        });
      }
      throw new ApolloError("", UNKNOWN_ERROR, {
        details: {
          saleChannel: "default",
          reason: UNKNOWN_ERROR,
        },
      });
    } else {
      return { done: true };
    }
  },
  async doCancelQuote(
    __parent: unknown,
    _args: CancelQuoteArgs
  ): Promise<ICancelQuoteResponseReschedule> {
    let urlBackend = "";
    switch (_args.plant) {
      case "lasheras":
        urlBackend =
          getConfig().serverRuntimeConfig.lasherasBackendUrl + cancelQuote;
        break;
      case "maipu":
        urlBackend =
          getConfig().serverRuntimeConfig.maipuBackendUrl + cancelQuote;
        break;
      case "rivadavia":
        urlBackend =
          getConfig().serverRuntimeConfig.rivadaviaBackendUrl + cancelQuote;
        break;
      case "sanmartin":
          urlBackend =
            getConfig().serverRuntimeConfig.sanmartinBackendUrl + cancelQuote;
          break;
      case "godoycruz":
        urlBackend =
          getConfig().serverRuntimeConfig.godoycruzBackendUrl + cancelQuote;
        break;
      default:
        urlBackend = "error";
        break;
    }
    const bodyData = {
      email: _args.email,
      id_turno: _args.quoteId
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    };
    const response = await fetch(urlBackend, requestOptions);
    if (!response.ok) {
      if (response.status === 404) {
        const errorData: IQuoteObtainingError = await response.json();
        throw new ApolloError("", errorData.reason, {
          details: errorData,
        });
      }
      if (response.status === 400) {
        throw new ApolloError("", BAD_REQUEST, {
          details: {
            saleChannel: "default",
            reason: BAD_REQUEST,
          },
        });
      }
      if (response.status === 500) {
        throw new ApolloError("", INTERNAL_ERROR_SERVER, {
          details: {
            saleChannel: "default",
            reason: INTERNAL_ERROR_SERVER,
          },
        });
      }
      throw new ApolloError("", UNKNOWN_ERROR, {
        details: {
          saleChannel: "default",
          reason: UNKNOWN_ERROR,
        },
      });
    } else {
      return { done: true };
    }
  }
};

export default { Query, Mutation };
