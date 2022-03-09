import { GameObject } from '@eva/eva.js';
import UndoButton from './UndoButton';
import RestartButton from './RestartButton';
import OutButton from './OutButton';

export const MENU_BUTTON_WIDTH = 50 * 1.1;
export const MENU_BUTTON_HEIGHT = 64 * 1.1;

const Menu = () => {
  const menu = new GameObject('menu', {
    position: {
      x: 0,
      y: 34,
    },
    origin: {
      x: 0.5,
      y: 0.5,
    },
    anchor: {
      x: 0.5,
      y: 0,
    },
  });

  menu.addChild(UndoButton());
  menu.addChild(OutButton());
  menu.addChild(RestartButton());

  return menu;
};

export default Menu;
