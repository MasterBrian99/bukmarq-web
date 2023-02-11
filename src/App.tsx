import { MantineProvider } from '@mantine/core';
import { AuthProvider } from 'react-auth-kit';
import { QueryClient, QueryClientProvider } from 'react-query';

import MainRouter from './router/MainRouter';
// import theme from './theme/theme';
function App() {
  const queryClient = new QueryClient();
  return (
    <AuthProvider authType={'localstorage'} authName={'_auth'}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <MainRouter />
        </MantineProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
