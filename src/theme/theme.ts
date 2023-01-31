import { ButtonStylesParams, MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
  colorScheme: 'light',
  components: {
    Button: {
      styles: (theme, params: ButtonStylesParams) => ({
        root: {
          height: 42,
          padding: '0 30px',
          backgroundColor:
            params.variant === 'filled'
              ? theme.colors[params.color || theme.primaryColor][9]
              : undefined,
        },
      }),
    },
  },
};

export default theme;
