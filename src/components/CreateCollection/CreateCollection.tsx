import { Button, Popover } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { Box, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { createCollection } from '../../api/collection';

interface Prop {
  children: React.ReactNode;
  parentId: number;
}
const CreateCollection = (prop: Prop) => {
  const queryClient = useQueryClient();
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      name: '',
    },
  });

  const createCollectionMutation = useMutation(createCollection, {
    onSuccess: (data) => {
      console.log(data);
      setOpened(false);
      queryClient.refetchQueries('parent_list', { stale: true });
    },
    onError: (err) => {
      // console.log(err.response?.data.error);
      console.log(err);
    },
  });

  function submitCreateCollection() {
    createCollectionMutation.mutate({
      data: {
        name: form.values.name,
        parentId: prop.parentId,
      },
    });
  }
  return (
    <>
      <Popover
        position="bottom"
        withArrow
        shadow="md"
        opened={opened}
        onChange={setOpened}
      >
        <Popover.Target>
          {/* <Button>Toggle popover</Button> */}
          <Box component={'span'} onClick={() => setOpened(true)}>
            {prop.children}
          </Box>
        </Popover.Target>
        <Popover.Dropdown>
          <form onSubmit={form.onSubmit(() => submitCreateCollection())}>
            <TextInput
              {...form.getInputProps('name')}
              placeholder="Collection name"
              label="Collection name"
              required
            />
            <Group position="right" mt="md">
              <Button type="submit">Create</Button>
            </Group>
          </form>
        </Popover.Dropdown>
      </Popover>
    </>
  );
};

export default CreateCollection;
