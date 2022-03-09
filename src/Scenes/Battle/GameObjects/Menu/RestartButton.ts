import { GameObject } from '@eva/eva.js';
import { Sprite } from '@eva/plugin-renderer-sprite';
import EventManager from '../../../../Runtime/EventManager';
import { EVENT_ENUM } from '../../../../Enums';
import { Event } from '@eva/plugin-renderer-event';
import { MENU_BUTTON_HEIGHT, MENU_BUTTON_WIDTH } from './index';

const RestartButton = () => {
  const restart = new GameObject('restart', {
    position: {
      x: 0,
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

  restart.addComponent(
    new Sprite({
      resource: 'ctrl',
      spriteName: 'ctrl (8).png',
    }),
  );

  const event = restart.addComponent(new Event());
  const endHandler = () => {
    EventManager.Instance.emit(EVENT_ENUM.RESTART_LEVEL);
  };

  event.on('touchend', endHandler);

  event.on('touchendoutside', endHandler);

  return restart;
};

export default RestartButton;
