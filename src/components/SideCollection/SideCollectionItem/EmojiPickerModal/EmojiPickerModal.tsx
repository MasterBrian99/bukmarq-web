import { Group, Modal, UnstyledButton } from '@mantine/core';
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { updateEmoji } from '../../../../api/collection';

interface Prop {
  id: number;
  emoji: string;
}

const EmojiPickerModal = (prop: Prop) => {
  const queryClient = useQueryClient();

  const [opened, setOpened] = useState(false);
  const emojiUpdateMutation = useMutation(updateEmoji, {
    onSuccess: () => {
      //   console.log(data);
      queryClient.refetchQueries(['parent_list', prop.id]);
      queryClient.refetchQueries(['parent_list'], { stale: true });
      setOpened(false);
    },
    onError: (err) => {
      // console.log(err.response?.data.error);
      console.log(err);
    },
  });

  return (
    <>
      <Modal
        centered
        size="auto"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        <EmojiPicker
          onEmojiClick={(e) => {
            // console.log(e.unified);
            emojiUpdateMutation.mutate({
              data: {
                collectionId: prop.id,
                unified: e.unified,
              },
            });
          }}
        />
      </Modal>

      <Group position="center" display={'inline'}>
        <UnstyledButton
          component={'span'}
          onClick={() => setOpened(true)}
          style={{ marginRight: 9, fontSize: 16 }}
        >
          <Emoji unified={prop.emoji} size={20} />
        </UnstyledButton>
      </Group>
    </>
  );
};

export default EmojiPickerModal;
