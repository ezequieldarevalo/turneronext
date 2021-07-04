import React from "react";
import styled from "styled-components";
import useQuoteObtaining from "hooks/useQuoteObtaining";
import I18n from "components/common/i18n";

import {
  ProductsContainer,
  Title,
  ProductsList,
  Product,
  Image,
  Description,
} from "./styles";

const Info = styled.div`
  margin-top: 15px;
`;

const getAddressPlant = (plant) => {
  if (plant === "maipu")
    return "Mallea S/N entre Alsina y Dorrego General Gutiérrez";
  else {
    if (plant === "lasheras")
      return "Acceso Norte Lateral Este S/N Km. 6,5 Bº El Plumerillo (Las Heras)";
    else return "San Isidro Norte y calle Belgrano – Rivadavia – Mendoza";
  }
};

function Products(): JSX.Element {
  const [{ quotes }] = useQuoteObtaining();

  return (
    <ProductsContainer>
      <Title>
        <I18n id="app.quoteObtaining.info.title" />
      </Title>
      <Info>
        <p>
          <b>Vehiculo:&nbsp;&nbsp;</b>
          {quotes.tipo_vehiculo}
        </p>
        <p>
          <b>Precio:&nbsp;&nbsp;</b>${quotes.precio}.-
        </p>
        <p>
          <b>Planta:&nbsp;&nbsp;</b>
          {quotes.plant.toUpperCase()}
        </p>
        <p>
          <b>Dirección:&nbsp;&nbsp;</b>
          {getAddressPlant(quotes.plant)}
        </p>
      </Info>
    </ProductsContainer>
  );
}

export default Products;
