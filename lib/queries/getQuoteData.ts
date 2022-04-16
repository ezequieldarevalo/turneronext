import gql from 'graphql-tag';

export default gql`
  query getData($vehicleType: String!, $plant: String!, $operation: String!) {
    quotes: getQuoteData(vehicleType: $vehicleType,plant: $plant, operation: $operation) {
      plant
      tipo_vehiculo
      precio
      dias
      turnos {
        id
        fecha
        hora
      }
      fecha
      hora
    }
  }
`;
