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
    id: Int!
    plant: String!
    tipo_vehiculo: String!
    precio: Int!
    turnos: [tTurno]
    dias: [String]!
    fecha: String
    hora: String
  }

  type RescheduleResponse {
    url_pago: String!
  }

  type ChangeDateResponse {
    done: Boolean!
  }

  type CancelQuoteResponse {
    done: Boolean!
  }

  type Query {
    getQuoteData(id: String!,plant: String!,operation: String!): QuoteObtaining
  }

  type Mutation {
    doReschedule(plant: String!,email: String!, quoteId: Int!, tipoVehiculo: String!, rtoId: Int!, paymentMethod: String!): RescheduleResponse
    doChangeDate(plant: String!,email: String!, quoteId: Int!, oldQuoteId: Int!): ChangeDateResponse
    doCancelQuote(plant: String!,email: String!, quoteId: Int!): CancelQuoteResponse
  }

`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});