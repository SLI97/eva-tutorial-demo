import { Scene } from '@eva/eva.js';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../index';
import BackgroundColor from './GameObjects/BackgroundColor';
import Footer from './GameObjects/Footer';
import Controller from './GameObjects/Controller';
import { BattleManager } from './BattleManager';

const BattleScene = () => {
  const scene = new Scene('BattleScene', {
    size: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    },
  });

  scene.addChild(BackgroundColor());
  scene.addChild(Controller());

  scene.addComponent(new BattleManager());

  scene.addChild(Footer());

  return scene;
};

export default BattleScene;