import { GameObject } from '@eva/eva.js';
import { Sprite } from '@eva/plugin-renderer-sprite';
import EventManager from '../../../../Runtime/EventManager';
import { EVENT_ENUM } from '../../../../Enums';
import { Event } from '@eva/plugin-renderer-event';
import { MENU_BUTTON_HEIGHT, MENU_BUTTON_WIDTH } from './index';

const UndoButton = () => {
  const undo = new GameObject('undo', {
    position: {
      x: -90,
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

  undo.addComponent(
    new Sprite({
      resource: 'ctrl',
      spriteName: 'ctrl (9).png',
    }),
  );

  const event = undo.addComponent(new Event());
  const endHandler = () => {
    EventManager.Instance.emit(EVENT_ENUM.REVOKE_STEP);
  };

  event.on('touchend', endHandler);

  event.on('touchendoutside', endHandler);

  return undo;
};

export default UndoButton;
