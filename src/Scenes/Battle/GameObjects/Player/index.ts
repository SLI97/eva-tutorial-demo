import { GameObject } from '@eva/eva.js';
import PlayerManager from './Scripts/PlayerManager';

export const ENTITY_WIDTH = 128;
export const ENTITY_HEIGHT = 128;

export const ANIMATION_SPEED = 1000 / 8;

const Player = () => {
  const player = new GameObject('player', {
    size: {
      width: ENTITY_WIDTH,
      height: ENTITY_HEIGHT,
    },
  });

  player.addComponent(new PlayerManager());

  return player;
};

export default Player;
