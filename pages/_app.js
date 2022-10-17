import "../styles/globals.scss";
import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import ComponetApp from "../components/componetApp";
function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  return (
    <SessionProvider session={session}>
      <AnimatePresence
        exitBeforeEnter
        onExitComplete={() => {
          window.scrollTo(0, 0);
        }}
      >
        <ComponetApp
          Component={Component}
          pageProps={pageProps}
          key={router.route}
        />
      </AnimatePresence>
    </SessionProvider>
  );
}

export default MyApp;
