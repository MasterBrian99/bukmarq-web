import { MantineProvider } from '@mantine/core';
import { AuthProvider } from 'react-auth-kit';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';

import MainRouter from './router/MainRouter';
// import theme from './theme/theme';
function App() {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <AuthProvider authType={'localstorage'} authName={'_auth'}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <MainRouter />
          </MantineProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </RecoilRoot>
  );
}

export default App;
