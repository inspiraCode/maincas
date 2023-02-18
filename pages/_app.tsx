import MiniDrawer from '@/components/Drawer';
import '@/styles/globals.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      authorizationParams={{
        redirect_uri: process.env.NEXT_PUBLIC_BASE_URL,
        audience: process.env.NEXT_PUBLIC_AUDIENCE,
        scope: 'read:current_user update:current_user_metadata'
      }}
    >
      {/* <UserProvider> */}
      <QueryClientProvider client={queryClient}>
        <MiniDrawer>
          <Component {...pageProps} />
        </MiniDrawer>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Auth0Provider>
  );
}
