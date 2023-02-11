import {
  ActionIcon,
  AppShell,
  Badge,
  Code,
  createStyles,
  Group,
  Navbar,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import React from 'react';
import { useQuery } from 'react-query';
import { Outlet } from 'react-router-dom';

import { getParentList } from '../../api/collection';
import { SideCollectionItem } from '../../components/SideCollection/SideCollectionItem/SideCollectionItem';
import { CollectionItemResponseI } from '../../dto/collection';
import { CommonResponseI } from '../../dto/common';
import CommonIcons from '../../util/CommonIcons';
const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    pointerEvents: 'none',
  },

  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5,
  },

  collectionLink: {
    cursor: 'pointer',
    display: 'block',
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: 'none',
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },
  collectionLinkArrow: {
    marginRight: '4px',
  },
}));

const links = [
  { icon: CommonIcons.BsChevronRight, label: 'Activity', notifications: 3 },
  { icon: CommonIcons.BsChevronRight, label: 'Tasks', notifications: 4 },
  { icon: CommonIcons.BsChevronRight, label: 'Contacts' },
];

const MainLayout = () => {
  const { classes } = useStyles();

  const parentListQuery = useQuery<CommonResponseI<CollectionItemResponseI[]>>({
    queryKey: [['parent_list']],
    queryFn: () => getParentList(),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const theme = useMantineTheme();
  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={'1.5'} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

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
        <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
          <Navbar.Section className={classes.section}>
            <Text>Hello</Text>
          </Navbar.Section>

          <TextInput
            placeholder="Search"
            size="xs"
            icon={<CommonIcons.BsChevronRight size={12} stroke={'1.5'} />}
            rightSectionWidth={70}
            rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
            styles={{ rightSection: { pointerEvents: 'none' } }}
            mb="sm"
          />

          <Navbar.Section className={classes.section}>
            <div className={classes.mainLinks}>{mainLinks}</div>
          </Navbar.Section>

          <Navbar.Section className={classes.section}>
            <Group className={classes.collectionsHeader} position="apart">
              <Text size="xs" weight={500} color="dimmed">
                Collections
              </Text>
              <Tooltip label="Create collection" withArrow position="right">
                <ActionIcon variant="default" size={18} my={'sm'}>
                  <CommonIcons.MdOutlineAdd size={12} stroke={'1.5'} />
                </ActionIcon>
              </Tooltip>
            </Group>
            <div className={classes.collections}>
              {parentListQuery.isLoading ? (
                <></>
              ) : (
                <>
                  {parentListQuery.data &&
                    parentListQuery.data.data &&
                    parentListQuery.data.data.map((ele, i) => (
                      <SideCollectionItem
                        padding={0}
                        id={ele.id}
                        emoji={'💸'}
                        label={ele.name}
                        key={i}
                      />
                    ))}
                </>
              )}
            </div>
          </Navbar.Section>
        </Navbar>
      }
    >
      <Outlet />
    </AppShell>
  );
};

export default MainLayout;
