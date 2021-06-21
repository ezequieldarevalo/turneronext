import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';
import gql from 'graphql-tag';

const typeDefs = gql`

  type tTurno {
    id: Int!
    fecha: String!
    hora: String!
  }

  type QuoteObtaining {
    id: String!
    plant: String!
    tipo_vehiculo: String!
    precio: Int!
    turnos: [tTurno]
    dias: [String]!
  }

  type RescheduleResponse {
    done: Boolean
  }



  type Query {
    getQuoteData(id: String!,plant: String!): QuoteObtaining
    doReschedule(email: String!, quoteId: Int!, tipoVehiculo: String!, rtoId: Int!, paymentMethod: String!): RescheduleResponse
  }

`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});