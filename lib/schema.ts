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
  }

  type RescheduleResponse {
    url_pago: String!
  }



  type Query {
    getQuoteData(id: String!,plant: String!): QuoteObtaining
    
  }

  type Mutation {
    doReschedule(plant: String!,email: String!, quoteId: Int!, tipoVehiculo: String!, rtoId: Int!, paymentMethod: String!): RescheduleResponse
  }

`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});