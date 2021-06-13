import getConfig from 'next/config';
import type {
  IQuoteObtaining,
} from '../contexts/QuoteObtaining';
import { IQuoteObtainingError } from '../contexts/QuoteObtaining';
import { ApolloError } from 'apollo-server-errors';

const BAD_REQUEST = 'BAD_REQUEST';
const INTERNAL_ERROR_SERVER = 'INTERNAL_ERROR_SERVER';
const UNKNOWN_ERROR = 'UNKNOWN_ERROR';

interface GetDeliveryDataArgs {
  id: string;
}

interface DoRescheduleArgs {
  id: string;
  date: string;
  shift: string;
}

const Query = {
  async getQuoteObtainingData(
    __parent: unknown,
    _args: GetDeliveryDataArgs
  ): Promise<IQuoteObtaining> {
    // const url = new URL(
    //   _args.id,
    //   getConfig().serverRuntimeConfig.composerSchedulingUrl
    // );
    // const response = await fetch(url.toString());
    const response = await fetch('https://b59b54d2-6fe3-483e-997d-471600f56e34.mock.pstmn.io/getDeliveryData2/200IMG');
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
      const result = { ...data, id: _args.id };
      return result;
    }
  },
};

// const Mutation = {
//   async doReschedule(
//     __parent: unknown,
//     _args: DoRescheduleArgs
//   ): Promise<IQuoteObtainingResponse> {
//     const url = new URL(
//       _args.id,
//       getConfig().serverRuntimeConfig.composerSchedulingUrl
//     );
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         deliveryDate: _args.date,
//         deliveryShift: _args.shift,
//       }),
//     };
//     const response = await fetch(url.toString(), requestOptions);
//     if (!response.ok) {
//       if (response.status === 404) {
//         const errorData: ISchedulingError = await response.json();
//         throw new ApolloError('', errorData.reason, {
//           details: errorData,
//         });
//       }
//       if (response.status === 400) {
//         throw new ApolloError('', BAD_REQUEST, {
//           details: {
//             saleChannel: 'default',
//             reason: BAD_REQUEST,
//           },
//         });
//       }
//       if (response.status === 500) {
//         throw new ApolloError('', INTERNAL_ERROR_SERVER, {
//           details: {
//             saleChannel: 'default',
//             reason: INTERNAL_ERROR_SERVER,
//           },
//         });
//       }
//       throw new ApolloError('', UNKNOWN_ERROR, {
//         details: {
//           saleChannel: 'default',
//           reason: UNKNOWN_ERROR,
//         },
//       });
//     } else {
//       const result = {
//         done: true,
//       };
//       return result;
//     }
//   },
// };

// export default { Query, Mutation };
export default { Query };