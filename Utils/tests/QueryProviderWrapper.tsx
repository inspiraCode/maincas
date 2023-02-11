import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
      cacheTime: Infinity
    }
  },
  logger: {
    log: console.log,
    warn: console.warn,
    // ✅ no more errors on the console for tests
    error: process.env.NODE_ENV === 'test' ? () => {} : console.error
  }
});
interface WrapperProps {
  children: React.ReactNode;
}
export const QueryProviderWrapper: React.FC<WrapperProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
