import getConfig from "next/config";
import type {IQuoteObtainingError, IQuoteObtaining, IRescheduleResponse } from "../contexts/QuoteObtaining";
import { ApolloError } from "apollo-server-errors";

const BAD_REQUEST = "BAD_REQUEST";
const INTERNAL_ERROR_SERVER = "INTERNAL_ERROR_SERVER";
const UNKNOWN_ERROR = "UNKNOWN_ERROR";

interface GetQuoteDataArgs {
  id: string;
  plant: string;
}

const valTur = "api/auth/valTur2";
const solTur = "api/auth/solTur";
const origen= "T";

interface DoRescheduleArgs {
  plant: string;
  email: string;
  quoteId: number;
  tipoVehiculo: string;
  rtoId: number;
  paymentMethod: string;
}

const Query = {
  async getQuoteData(
    __parent: unknown,
    _args: GetQuoteDataArgs
  ): Promise<IQuoteObtaining> {
    let urlBackend = "";
    if (_args.plant === "lasheras") {
      urlBackend = getConfig().serverRuntimeConfig.lasherasBackendUrl + valTur;
    } else {
      urlBackend = getConfig().serverRuntimeConfig.maipuBackendUrl + valTur;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nro_turno_rto: _args.id,
      }),
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
      const result = { ...data,id: _args.id, plant: _args.plant};
      return result;
    }
  },
};

const Mutation = {
  async doReschedule(
    __parent: unknown,
    _args: DoRescheduleArgs
  ): Promise<IRescheduleResponse> {
    let urlBackend = "";
    if (_args.plant === "lasheras") {
      urlBackend = getConfig().serverRuntimeConfig.lasherasBackendUrl + solTur;
    } else {
      urlBackend = getConfig().serverRuntimeConfig.maipuBackendUrl + solTur;
    }
    const bodyData={
      origen,
      email: _args.email,
      id_turno: _args.quoteId,
      tipo_vehiculo: _args.tipoVehiculo,
      nro_turno_rto: _args.rtoId,
      plataforma_pago: _args.paymentMethod
    };
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
    };
    console.log()
    const response = await fetch(urlBackend, requestOptions);
    if (!response.ok) {
      if (response.status === 404) {
        const errorData: IQuoteObtainingError = await response.json();
        throw new ApolloError('', errorData.reason, {
          details: errorData,
        });
      }
      if (response.status === 400) {
        throw new ApolloError('', BAD_REQUEST, {
          details: {
            saleChannel: 'default',
            reason: BAD_REQUEST,
          },
        });
      }
      if (response.status === 500) {
        throw new ApolloError('', INTERNAL_ERROR_SERVER, {
          details: {
            saleChannel: 'default',
            reason: INTERNAL_ERROR_SERVER,
          },
        });
      }
      throw new ApolloError('', UNKNOWN_ERROR, {
        details: {
          saleChannel: 'default',
          reason: UNKNOWN_ERROR,
        },
      });
    } else {
      const data = await response.json();      
      return data;
    }
  },
};

export default { Query, Mutation };
