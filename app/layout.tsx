'use client';
import './globals.css';

import { UserProvider } from '@auth0/nextjs-auth0/client';
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
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <Drawer>{children}</Drawer>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </UserProvider>
      </body>
    </html>
  );
}
