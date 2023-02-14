'use client';
import './globals.css';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Drawer from '../components/Drawer';

const queryClient = new QueryClient();

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Auth0Provider
          domain='dev-dsuv8kmx.auth0.com'
          clientId='canBWMbnoEequnkcL5gPnFGCWKugIiGo'
          authorizationParams={{
            redirect_uri: 'http://localhost:3000',
            audience: 'https://dev-dsuv8kmx.auth0.com/api/v2/',
            scope: 'read:current_user update:current_user_metadata'
          }}
        >
          {/* <UserProvider> */}
          <QueryClientProvider client={queryClient}>
            <Drawer>{children}</Drawer>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
          {/* </UserProvider> */}
        </Auth0Provider>
      </body>
    </html>
  );
}
