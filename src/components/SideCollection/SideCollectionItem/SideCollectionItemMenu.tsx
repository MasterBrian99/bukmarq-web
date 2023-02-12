import { Menu, Text, UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import { useMutation, UseQueryResult } from 'react-query';
import { useRecoilState } from 'recoil';

import { updateParent } from '../../../api/collection';
import { CollectionItemResponseI } from '../../../dto/collection';
import { CommonResponseI } from '../../../dto/common';
import { movingCollectionAtom } from '../../../store/atom/atom';
import CommonIcons from '../../../util/CommonIcons';
import CreateCollection from '../../CreateCollection/CreateCollection';

interface Prop {
  collectionId: number;
  query: UseQueryResult<CommonResponseI<CollectionItemResponseI[]>, unknown>;
}

const SideCollectionItemMenu = (prop: Prop) => {
  const [opened, setOpened] = useState(false);
  const [movingCollection, setMovingCollection] = useRecoilState(movingCollectionAtom);
  const parentChangeMutation = useMutation(updateParent, {
    onSuccess: (data) => {
      console.log(data);
      prop.query.refetch();
      setMovingCollection(null);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function changeParent() {
    if (movingCollection) {
      parentChangeMutation.mutate({
        data: {
          collectionId: movingCollection,
          parentId: prop.collectionId,
        },
      });
    }
  }

  return (
    <Menu shadow="md" position="right-start" opened={opened} onChange={setOpened}>
      <Menu.Target>
        <UnstyledButton>
          <CommonIcons.RxDotsHorizontal />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<CommonIcons.MdContentCut size={14} />}
          onClick={() => setMovingCollection(prop.collectionId)}
        >
          Cut
        </Menu.Item>
        <Menu.Item
          icon={<CommonIcons.MdContentPaste size={14} />}
          disabled={movingCollection == null}
          onClick={() => changeParent()}
        >
          Paste
        </Menu.Item>
        <CreateCollection>
          <Menu.Item closeMenuOnClick={false}>Create collection</Menu.Item>
        </CreateCollection>
        <Menu.Item
          icon={<CommonIcons.BsChevronRight size={14} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<CommonIcons.BsChevronRight size={14} />}>
          Transfer my data
        </Menu.Item>
        <Menu.Item color="red" icon={<CommonIcons.BsChevronRight size={14} />}>
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default SideCollectionItemMenu;
