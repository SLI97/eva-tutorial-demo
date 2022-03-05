export const ANIMATION_SPEED = 1000 / 8;

/**
 * TODO State具有播放动画的能力
 */
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';

export default class State {
  constructor(public spriteAnimation: SpriteAnimation, public animationName: string, public times?: number) {}

  run() {
    this.spriteAnimation.resource = this.animationName;
    requestAnimationFrame(() => {
      this.spriteAnimation.play(this.times);
    });
  }
}
