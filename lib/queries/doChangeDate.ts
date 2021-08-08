import gql from 'graphql-tag';

export default gql`
  mutation doChangeDate($plant: String!, $email: String!, $quoteId: Int!, $oldQuoteId: Int!) {
    Reschedule: doChangeDate(plant: $plant, email: $email, quoteId: $quoteId, oldQuoteId: $oldQuoteId) {
      done
    }
  }
`;
