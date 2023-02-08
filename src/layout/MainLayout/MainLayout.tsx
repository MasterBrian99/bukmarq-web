import {
  AppShell,
  Box,
  createStyles,
  Grid,
  Navbar,
  ScrollArea,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import React from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import SideBar from '../../components/SideBar/SideBar';
const MainLayout = () => {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
          className={classes.navbar}
        >
          <Navbar.Section m={0} grow component={ScrollArea} pt={'xl'}>
            <SideBar />
          </Navbar.Section>
        </Navbar>
      }
    >
      <Outlet />
    </AppShell>
  );
};

export default MainLayout;
const useStyles = createStyles((theme, _params, getRef) => ({
  navbar: {
    backgroundColor: theme.colors.gray[1],
  },
}));
