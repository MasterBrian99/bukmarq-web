import { useState } from 'react';
import { useMutation } from 'react-query';

import { createCollection } from '../../api/collection';

export const useCreateCollection = () => {
  const [response, setResponse] = useState(false);
  const createCollectionMutation = useMutation(createCollection, {
    onSuccess: (data) => {
      console.log(data);
      setResponse(true);
    },
    onError: (err) => {
      // console.log(err.response?.data.error);
      console.log(err);
      setResponse(false);
    },
  });
  return [createCollectionMutation.mutate];
};
