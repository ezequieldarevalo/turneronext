import gql from 'graphql-tag';

export default gql`
  mutation doReschedule(
    $plant: String!,
    $email: String!,
    $dominio: String!,
    $nombre: String!,
    $telefono: String!,
    $anio: String!,
    $combustible: String!,
    $quoteId: Int!,
    $tipoVehiculo: String!,
    $paymentMethod: String!
  ) {
    Reschedule: doReschedule(
      plant: $plant,
      email: $email,
      dominio: $dominio,
      nombre: $nombre,
      telefono: $telefono,
      anio: $anio,
      combustible: $combustible,
      quoteId: $quoteId,
      tipoVehiculo: $tipoVehiculo,
      paymentMethod: $paymentMethod
    ) {
      url_pago
    }
  }
`;
