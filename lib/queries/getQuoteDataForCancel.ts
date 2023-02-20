import gql from 'graphql-tag';

export default gql`
  query getDataForCancel($id: Int!, $plant: String!, $operation: String!) {
    quotes: getQuoteDataForCancel(id: $id,plant: $plant, operation: $operation) {
      plant
      quote {
        id
        fecha
        hora
      }
    }
  }
`;
