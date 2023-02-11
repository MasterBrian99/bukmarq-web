import { atom } from 'recoil';

export const movingCollectionAtom = atom<number | null>({
  key: 'movingCollectionState', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
