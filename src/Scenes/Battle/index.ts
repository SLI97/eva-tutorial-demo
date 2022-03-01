import { Scene, GameObject } from '@eva/eva.js';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../index';
import { Graphics } from '@eva/plugin-renderer-graphics';
import { Text } from '@eva/plugin-renderer-text';

const BattleScene = () => {
  const scene = new Scene('BattleScene', {
    size: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    },
  });

  const backgroundColor = new GameObject('backgroundColor', {});
  const graphics = backgroundColor.addComponent(new Graphics());
  graphics.graphics.beginFill(0x140a27, 1);
  graphics.graphics.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  graphics.graphics.endFill();

  scene.addChild(backgroundColor);

  const footer = new GameObject('footer', {
    position: {
      x: 0,
      y: -16,
    },
    origin: {
      x: 0.5,
      y: 1,
    },
    anchor: {
      x: 0.5,
      y: 1,
    },
  });
  footer.addComponent(
    new Text({
      text: 'Cramped Room Of Death Demo',
      style: {
        fontSize: 12,
        fontWeight: 'bold',
        fill: ['#ccc'],
        fontFamily: 'Arial',
      },
    }),
  );

  scene.addChild(footer);

  return scene;
};

export default BattleScene;
