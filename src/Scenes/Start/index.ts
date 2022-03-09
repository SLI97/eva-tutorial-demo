import { GameObject, LOAD_EVENT, resource, Scene } from '@eva/eva.js';
import { game, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../index';
import { Graphics } from '@eva/plugin-renderer-graphics';
import Menu from '../Menu';

const StartScene = () => {
  const start = new Scene('start', {
    size: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    },
  });

  const outer = new GameObject('outer', {});
  const inner = new GameObject('inner', {});

  start.addChild(outer);
  start.addChild(inner);

  const graphics1 = outer.addComponent(new Graphics());
  graphics1.graphics.beginFill(0xffffff, 1);
  graphics1.graphics.drawRect(60, SCREEN_HEIGHT / 2 - 50, SCREEN_WIDTH - 120, 50);

  graphics1.graphics.endFill();
  const graphics2 = inner.addComponent(new Graphics());
  // resourceTotal
  // resourceLoadedCount
  resource.on(LOAD_EVENT.PROGRESS, ({ resourceLoadedCount, resourceTotal }) => {
    const percent = resourceLoadedCount / resourceTotal;
    graphics2.graphics.beginFill(0xfdca30, 1);
    graphics2.graphics.drawRect(60, SCREEN_HEIGHT / 2 - 50, (SCREEN_WIDTH - 120) * percent, 50);
    graphics2.graphics.endFill();
  }); // 加载进度更新
  resource.on(LOAD_EVENT.COMPLETE, () => {
    game.scene.destroy();
    game.loadScene({
      scene: Menu(),
    });
  }); // 加载完成
  resource.preload();

  return start;
};

export default StartScene;
