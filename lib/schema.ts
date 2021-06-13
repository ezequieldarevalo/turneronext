import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';
import gql from 'graphql-tag';

const typeDefs = gql`


  type QuoteObtaining {
    availableDates: String!
  }



  type Query {
    getQuoteObtainingData(id: String!): QuoteObtaining
  }

`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});