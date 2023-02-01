import { Box, Button, MantineProvider, Paper, Text } from '@mantine/core';

import theme from './theme/theme';
function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Button>Hello</Button>
      <Text>asdasd</Text>
    </MantineProvider>
  );
}

export default App;
