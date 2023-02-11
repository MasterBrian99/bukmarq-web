import { Box, createStyles, Flex, Text, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { getChildrenList } from '../../../api/collection';
import { CollectionItemResponseI } from '../../../dto/collection';
import { CommonResponseI } from '../../../dto/common';
import CommonIcons from '../../../util/CommonIcons';
import SideCollectionItemMenu from './SideCollectionItemMenu';

const useStyles = createStyles((theme) => ({
  collectionLink: {
    width: '100%',
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
export const SideCollectionItem = (collection: Props) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const parentListQuery = useQuery<CommonResponseI<CollectionItemResponseI[]>>({
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
      <Flex
        key={collection.label}
        className={classes.collectionLink}
        justify={'space-between'}
      >
        <Box>
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
                transform: opened
                  ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)`
                  : 'none',
              }}
            />
          </Box>
          <Box component={'span'} style={{ marginRight: 9, fontSize: 16 }}>
            {collection.emoji}
          </Box>
          <Box component={'span'}>{collection.label}</Box>
        </Box>
        <Box pos={'relative'}>
          <SideCollectionItemMenu collectionId={collection.id} query={parentListQuery} />
        </Box>
      </Flex>
      <Box>
        <Box>
          {opened &&
          parentListQuery.data &&
          parentListQuery.data.data &&
          parentListQuery.data.data.length == 0 ? (
            <Text pl={7} size={'xs'} color={'dimmed'}>
              no collections found
            </Text>
          ) : (
            opened &&
            parentListQuery.data &&
            parentListQuery.data.data &&
            parentListQuery.data.data.map((ele) => (
              <SideCollectionItem
                id={ele.id}
                emoji={'📅'}
                label={ele.name}
                key={ele.id}
                padding={7}
              />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};
