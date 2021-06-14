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
    tipo_vehiculo: String!
    precio: Int!
    turnos: [tTurno]
  }



  type Query {
    getQuoteData(id: String!,plant: String!): QuoteObtaining
  }

`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});