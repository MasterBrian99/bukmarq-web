import {
  Box,
  createStyles,
  Group,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import React from 'react';

import CommonIcons from '../../util/CommonIcons';

const SideBar = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <Box>
      <UnstyledButton className={classes.button} px={'sm'} py={7}>
        <Group position={'left'}>
          <CommonIcons.BsChevronRight
          // style={{
          //   transform: false ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
          // }}
          />
          <Text size={'sm'} weight={'lighter'}>
            🖊 Something Happen
          </Text>
        </Group>
      </UnstyledButton>
    </Box>
  );
};

export default SideBar;

const list = [
  {
    id: 1,
    created_at: '2023-02-07T20:44:48.000Z',
    updated_at: '2023-02-07T20:44:48.000Z',
    status: 'ACTIVE',
    name: 'personal1',
    children: [
      {
        id: 2,
        created_at: '2023-02-07T20:45:36.000Z',
        updated_at: '2023-02-07T20:45:36.000Z',
        status: 'ACTIVE',
        name: '11',
        children: [
          {
            id: 3,
            created_at: '2023-02-07T20:45:59.000Z',
            updated_at: '2023-02-07T20:45:59.000Z',
            status: 'ACTIVE',
            name: 'asdasd',
            children: [],
          },
        ],
      },
      {
        id: 4,
        created_at: '2023-02-07T20:46:06.000Z',
        updated_at: '2023-02-07T20:46:06.000Z',
        status: 'ACTIVE',
        name: 'zzdasd',
        children: [],
      },
    ],
  },
  {
    id: 5,
    created_at: '2023-02-07T20:58:17.000Z',
    updated_at: '2023-02-07T20:58:17.000Z',
    status: 'ACTIVE',
    name: 'zzdasd',
    children: [],
  },
];

const useStyles = createStyles((theme, _params, getRef) => ({
  button: {
    borderWidth: '1px',
    borderColor: 'blue',
    width: '100%',
    '&:hover': {
      backgroundColor: theme.colors.gray[3],
    },
  },
}));
