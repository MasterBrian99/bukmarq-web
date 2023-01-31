import { Button, MantineProvider, Text } from '@mantine/core';

import theme from './theme/theme';
function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Text>Welcome to Mantine!</Text>
      <Button variant={'gradient'}>Hello</Button>
    </MantineProvider>
  );
}

export default App;
