import gql from 'graphql-tag';

export default gql`
  mutation doCancelQuote($plant: String!, $email: String!, $quoteId: Int!) {
    Cancelation: doCancelQuote(plant: $plant, email: $email, quoteId: $quoteId) {
      done
    }
  }
`;
