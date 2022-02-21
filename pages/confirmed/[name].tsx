import React from "react";
import ViewWrapper from "../../components/layout/structure/ViewWrapper";
import Message from "../../components/layout/Message";
import ErrorMessage from "components/common/error/ErrorMessage";
import HeaderRevitotal from "components/layout/structure/HeaderRevitotal";
import { MessageTitle } from "../../components/common/styles/UtilsStyles";
import I18n from "../../components/common/i18n"
import { useRouter } from "next/router";
import HeaderRivadavia from "components/layout/structure/HeaderRivadavia";
import HeaderGodoyCruz from "components/layout/structure/HeaderGodoycruz";

const renderHeader = (plantName) => {
  if(plantName==='rivadavia') return <HeaderRivadavia />;
  if(plantName==='godoycruz') return <HeaderGodoyCruz />;
  return <HeaderRevitotal />;
}

function confirmed() {

  const {
    query: { name },
  } = useRouter();

  if(name!=="maipu" && name!=="lasheras" && name!=="rivadavia" && name!=="godoycruz")
    return (<ViewWrapper>
      <Message type="ERROR">
      <MessageTitle type="ERROR">
        <I18n
          id="app.quoteObtaining.error.notFound.title"
        />
        
      </MessageTitle>
      <br/></Message>
    </ViewWrapper>);
  return (
    <>
    {
      renderHeader(name)
    }
      <ViewWrapper plant={name}>
        <Message type="SUCCESS">
        <MessageTitle type="SUCCESS">
        <I18n
          id="app.quoteObtaining.error.confirmedQuote.title"
        />
      </MessageTitle>
      <p>
      <I18n
          id="app.quoteObtaining.error.confirmedQuote.message"
        />
      </p>
      <p>
      <I18n
          id="app.quoteObtaining.error.confirmedQuote.thanks"
        />
      </p>
      <br/>
        </Message>
      </ViewWrapper>
      
    </>
  );
}

export default confirmed;
