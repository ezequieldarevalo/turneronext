import gql from 'graphql-tag';

export default gql`
  mutation doReschedule($email: String!, $quoteId: Int!, $tipoVehiculo: String!, $rtoId: Int!, $paymentMethod: String!) {
    Reschedule: doReschedule(email: $email, quoteId: $quoteId, tipoVehiculo: $tipoVehiculo,rtoId: $rtoId, paymentMethod: $paymentMethod ) {
      done
    }
  }
`;
