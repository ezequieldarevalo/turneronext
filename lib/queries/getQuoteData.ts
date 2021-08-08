import gql from 'graphql-tag';

export default gql`
  query getData($id: String!, $plant: String!, $operation: String!) {
    quotes: getQuoteData(id: $id,plant: $plant, operation: $operation) {
      id
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
