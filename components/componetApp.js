import { appWithTranslation } from "next-i18next";
import React from "react";

const ComponentApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default appWithTranslation(ComponentApp);
