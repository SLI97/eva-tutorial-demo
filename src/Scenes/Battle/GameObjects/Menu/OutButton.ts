import { GameObject } from '@eva/eva.js';
import { Sprite } from '@eva/plugin-renderer-sprite';
import { Event } from '@eva/plugin-renderer-event';
import { MENU_BUTTON_HEIGHT, MENU_BUTTON_WIDTH } from './index';
import { game } from '../../../../index';
import Menu from '../../../Menu';

const OutButton = () => {
  const out = new GameObject('out', {
    position: {
      x: 90,
      y: 20,
    },
    size: {
      width: MENU_BUTTON_WIDTH,
      height: MENU_BUTTON_HEIGHT,
    },
    origin: {
      x: 0.5,
      y: 0.5,
    },
    anchor: {
      x: 0.5,
      y: 0.5,
    },
  });

  out.addComponent(
    new Sprite({
      resource: 'ctrl',
      spriteName: 'ctrl (10).png',
    }),
  );

  const event = out.addComponent(new Event());
  const endHandler = async () => {
    game.scene.destroy();
    game.loadScene({
      scene: Menu(),
    });
  };

  event.on('touchend', endHandler);

  event.on('touchendoutside', endHandler);

  return out;
};

export default OutButton;
