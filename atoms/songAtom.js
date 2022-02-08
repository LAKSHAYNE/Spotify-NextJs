import { atom } from 'recoil';

export const currenttrackidState = atom({
  key: 'currentTrackIdState',
  default: null,
});

export const isPlayingState = atom({
  key: 'isPlayingState',
  default: null,
});
