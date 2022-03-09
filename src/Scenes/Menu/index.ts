import { Scene } from '@eva/eva.js';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../index';
import Creator from './GameObjects/Creator';
import Tips from './GameObjects/Tips';
import Logo from './GameObjects/Logo';
import Title from './GameObjects/Title';
import { Event } from '@eva/plugin-renderer-event';
import { game } from '../../index';
import BattleScene from '../Battle';
import FaderManager from '../../Runtime/FaderManager';

const Menu = () => {
  const menu = new Scene('menu', {
    size: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    },
  });

  menu.addChild(Creator());
  menu.addChild(Logo());
  menu.addChild(Tips());
  menu.addChild(Title());
  menu.addChild(FaderManager.Instance.createFader());
  FaderManager.Instance.fadeOut(1000);

  const event = menu.addComponent(new Event());
  const endHandler = async () => {
    await FaderManager.Instance.fadeIn(300);
    game.scene.destroy();
    game.loadScene({
      scene: BattleScene(),
    });
  };

  event.once('touchend', endHandler);

  event.once('touchendoutside', endHandler);

  return menu;
};

export default Menu;
