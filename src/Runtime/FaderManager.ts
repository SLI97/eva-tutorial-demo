import Singleton from '../Base/Singleton';
import { GameObject } from '@eva/eva.js';
import { Graphics } from '@eva/plugin-renderer-graphics';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../index';
import { Render } from '@eva/plugin-renderer-render';
import DataManager from './DataManager';

enum FadeStaus {
  IDLE,
  FADE_IN,
  FADE_OUT,
}

const DEFAULT_DURATION = 200;

export default class FaderManager extends Singleton {
  static get Instance() {
    return super.GetInstance<FaderManager>();
  }

  oldFrame: number = 0;
  duration: number = DEFAULT_DURATION;
  render: Render;
  status: FadeStaus = FadeStaus.IDLE;
  resolve: (value: PromiseLike<null>) => void;

  createFader() {
    const fader = new GameObject('fader');
    const graphics = fader.addComponent(new Graphics());
    graphics.graphics.beginFill(0x0000000, 1);
    graphics.graphics.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    graphics.graphics.endFill();

    this.render = fader.addComponent(
      new Render({
        zIndex: 5,
        alpha: 1,
      }),
    );

    return fader;
  }

  update() {
    const curSecond = (DataManager.Instance.frame - this.oldFrame) / 60;
    const totalSecond = DEFAULT_DURATION / 1000;
    const fadePercent = curSecond / totalSecond;
    switch (this.status) {
      case FadeStaus.FADE_IN:
        if (fadePercent < 1) {
          this.render.alpha = fadePercent;
        } else {
          this.render.alpha = 1;
          this.status = FadeStaus.IDLE;
          this.resolve(null);
        }
        break;
      case FadeStaus.FADE_OUT:
        if (fadePercent < 1) {
          this.render.alpha = 1 - fadePercent;
        } else {
          this.render.alpha = 0;
          this.status = FadeStaus.IDLE;
          this.resolve(null);
        }
        break;
    }
  }

  fadeIn(duration = DEFAULT_DURATION) {
    this.render.alpha = 0;
    this.oldFrame = DataManager.Instance.frame;
    this.status = FadeStaus.FADE_IN;
    this.duration = duration;
    return new Promise(resolve => {
      this.resolve = resolve;
    });
  }

  fadeOut(duration = DEFAULT_DURATION) {
    this.render.alpha = 1;
    this.oldFrame = DataManager.Instance.frame;
    this.status = FadeStaus.FADE_OUT;
    this.duration = duration;
    return new Promise(resolve => {
      this.resolve = resolve;
    });
  }
}
