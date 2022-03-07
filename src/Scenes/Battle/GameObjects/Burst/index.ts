import { GameObject } from '@eva/eva.js';
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile';
import BurstManager from './Scripts/BurstManager';

const Burst = () => {
  const burst = new GameObject('burst', {
    size: {
      width: TILE_WIDTH,
      height: TILE_HEIGHT,
    },
  });

  burst.addComponent(new BurstManager());

  return burst;
};

export default Burst;
