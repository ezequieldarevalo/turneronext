import gql from 'graphql-tag';

export default gql`
  query getData($id: String!, $plant: String!) {
    quotes: getQuoteData(id: $id,plant: $plant) {
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
    }
  }
`;
