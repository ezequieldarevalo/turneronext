import gql from 'graphql-tag';

export default gql`
  query getData($id: String!) {
    quotes: getQuoteData(id: $id) {
      availableDates
    }
  }
`;
