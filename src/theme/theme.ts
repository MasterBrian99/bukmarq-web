import { MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
  colorScheme: 'light',
  primaryColor: 'green',
  globalStyles: (theme) => ({
    body: {
      ...theme.fn.fontStyles(),
      backgroundColor: theme.colors[theme.primaryColor][3],
      lineHeight: theme.lineHeight,
    },
  }),
  colors: {
    dracula: [
      '#7AD1DD',
      '#5FCCDB',
      '#44CADC',
      '#2AC9DE',
      '#1AC2D9',
      '#11B7CD',
      '#09ADC3',
      '#0E99AC',
      '#128797',
      '#147885',
    ],
  },
  components: {},
};

export default theme;

///theme guidelines
