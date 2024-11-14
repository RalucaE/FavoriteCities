import "@/styles/globals.css";
import { Provider } from "@/components/ui/provider";
import Layout from '../components/Layout';
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider>    
        <Layout>
          <Component {...pageProps} />
        </Layout>             
      </Provider>
    </SessionProvider>   
  );
}