import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';
import gql from 'graphql-tag';

const typeDefs = gql`


  type QuoteObtaining {
    id: String!
  }



  type Query {
    getQuoteData(id: String!,plant: String!): QuoteObtaining
  }

`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});