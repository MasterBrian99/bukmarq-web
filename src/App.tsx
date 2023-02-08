import { MantineProvider } from '@mantine/core';

import MainRouter from './router/MainRouter';
// import theme from './theme/theme';
function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <MainRouter />
    </MantineProvider>
  );
}

export default App;
