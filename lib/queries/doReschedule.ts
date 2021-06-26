import gql from 'graphql-tag';

export default gql`
  mutation doReschedule($plant: String!, $email: String!, $quoteId: Int!, $tipoVehiculo: String!, $rtoId: Int!, $paymentMethod: String!) {
    Reschedule: doReschedule(plant: $plant, email: $email, quoteId: $quoteId, tipoVehiculo: $tipoVehiculo,rtoId: $rtoId, paymentMethod: $paymentMethod ) {
      url_pago
    }
  }
`;
