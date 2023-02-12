import { Button } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { Box, Group, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { createCollection } from '../../api/collection';

interface Prop {
  children: React.ReactNode;
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
      queryClient.refetchQueries(['parent_list'], { stale: true });
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
        parentId: 0,
      },
    });
  }
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create new collection"
      >
        <Box>
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
        </Box>
      </Modal>

      <Group position="center">
        <Box component={'span'} onClick={() => setOpened(true)}>
          {prop.children}
        </Box>
      </Group>
    </>
  );
};

export default CreateCollection;
