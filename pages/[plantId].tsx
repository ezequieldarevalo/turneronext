import React from 'react'
import { useRouter } from "next/router";
import QuoteObtainingProvider from "contexts/QuoteObtaining";
import HeaderGodoyCruz from 'components/layout/structure/HeaderGodoycruz';
import HeaderRevitotal from 'components/layout/structure/HeaderRevitotal';
import HeaderRivadavia from 'components/layout/structure/HeaderRivadavia';
import HeaderSanmartin from 'components/layout/structure/HeaderSanmartin';
import Main from 'components/Main';
import {PLANTS} from 'lib/constants'

const HEADERS = {
  lasheras: <HeaderRevitotal />,
  maipu: <HeaderRevitotal />,
  rivadavia: <HeaderRivadavia />,
  godoycruz: <HeaderGodoyCruz />,
  sanmartin: <HeaderSanmartin />
};

const loadHeader = (plantId: string) => {
  const header = HEADERS[plantId]
  return header;
};

const Index = () => {
  const {
    query: { plantId },
  } = useRouter();
  const plantName=String(plantId) || null;
  const validPlant = PLANTS.some((plant) => plant.id === plantName )
    return (
      <>
        {validPlant && loadHeader(plantName) }
        <QuoteObtainingProvider id={0} plant={plantName} operation={validPlant ? 'chooseQuote' : 'error'}>
            <Main />
        </QuoteObtainingProvider>
      </>
      
    )
}

export default Index;