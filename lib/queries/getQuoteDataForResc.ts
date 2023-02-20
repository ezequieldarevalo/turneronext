import gql from 'graphql-tag';

export default gql`
  query getDataForResc($id: Int!, $plant: String!, $operation: String!) {
    quotes: getQuoteDataForResc(id: $id,plant: $plant, operation: $operation) {
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
