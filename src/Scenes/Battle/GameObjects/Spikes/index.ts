import { GameObject } from '@eva/eva.js';
import { ENTITY_HEIGHT, ENTITY_WIDTH } from '../../../../Base/EntityManager';
import SpikesManager from './Scripts/SpikesManager';
import { ISpikes } from '../../../../Levels';

const Spikes = (params: ISpikes) => {
  const spikes = new GameObject('spikes', {
    size: {
      width: ENTITY_WIDTH,
      height: ENTITY_HEIGHT,
    },
  });

  spikes.addComponent(new SpikesManager(params));

  return spikes;
};

export default Spikes;
