import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query';

import MainRouter from './router/MainRouter';
// import theme from './theme/theme';
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <MainRouter />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
