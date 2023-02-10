import { Box, createStyles, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { getChildrenList } from '../../../api/folder';
import { CommonResponseI } from '../../../dto/common';
import { FolderItemResponseI } from '../../../dto/folder';
import CommonIcons from '../../../util/CommonIcons';

const useStyles = createStyles((theme) => ({
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
  collectionLinkArrowIcon: {
    transition: 'transform 200ms ease',
  },
}));

interface Props {
  label: string;
  emoji: string;
  id: number;
  padding: number;
}
export const SideFolderItem = (collection: Props) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const parentListQuery = useQuery<CommonResponseI<FolderItemResponseI[]>>({
    queryKey: [['parent_list', collection.id]],
    queryFn: () => getChildrenList({ id: collection.id }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    enabled: opened,
    onSuccess: (data) => {
      console.log(data);
    },
  });
  return (
    <Box
      style={{
        paddingLeft: `${collection.padding}px`,
      }}
    >
      <Box key={collection.label} className={classes.collectionLink}>
        <Box
          component={'span'}
          className={classes.collectionLinkArrow}
          onClick={() => {
            setOpened((o) => !o);
            console.log(opened);
          }}
        >
          <CommonIcons.BsChevronRight
            size={12}
            className={classes.collectionLinkArrowIcon}
            style={{
              transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
            }}
          />
        </Box>
        <span style={{ marginRight: 9, fontSize: 16 }}>{collection.emoji}</span>{' '}
        {collection.label}
      </Box>
      <Box>
        <Box>
          {opened &&
            parentListQuery.data &&
            parentListQuery.data.data &&
            parentListQuery.data.data.map((ele) => (
              <SideFolderItem
                id={ele.id}
                emoji={'📅'}
                label={ele.name}
                key={ele.id}
                padding={7}
              />
            ))}
          {/* {collection.label == 'Saleasdasdasds' &&
            opened &&
            newCollections.map((collectionas, j) => (
              <SideFolderItem
                id={j}
                emoji={collectionas.emoji}
                label={collectionas.label}
                key={j}
              />
            ))} */}
        </Box>
      </Box>
    </Box>
  );
};

// const newCollections = [
//   { emoji: '👍', label: 'Sales' },
//   { emoji: '🚚', label: 'Deliveries' },
//   { emoji: '💸', label: 'Discounts' },
//   { emoji: '💰', label: 'Profits' },
//   { emoji: '✨', label: 'Reports' },
//   { emoji: '🛒', label: 'Orders' },
//   { emoji: '📅', label: 'Events' },
//   { emoji: '🙈', label: 'Debts' },
//   { emoji: '💁‍♀️', label: 'Customers' },
// ];
