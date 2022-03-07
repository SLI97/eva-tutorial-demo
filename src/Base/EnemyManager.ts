import EventManager from '../Runtime/EventManager';
import { DIRECTION_ENUM, ENTITY_STATE_ENUM, EVENT_ENUM } from '../Enums';
import EntityManager from './EntityManager';
import DataManager from '../Runtime/DataManager';

export default class EnemyManager extends EntityManager {
  static componentName = 'EnemyManager'; // 设置组件的名字

  init() {
    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onChangeDirection, this);
    EventManager.Instance.on(EVENT_ENUM.ATTACK_ENEMY, this.onDead, this);
  }

  onDestroy() {
    EventManager.Instance.off(EVENT_ENUM.PLAYER_MOVE_END, this.onChangeDirection);
    EventManager.Instance.off(EVENT_ENUM.ATTACK_ENEMY, this.onDead);
  }

  start() {
    this.onChangeDirection(true);
  }

  onChangeDirection(init = false) {
    if (this.state === ENTITY_STATE_ENUM.DEATH || !DataManager.Instance.player) {
      return;
    }
    const { x: playerX, y: playerY } = DataManager.Instance.player;

    const disX = Math.abs(this.x - playerX);
    const disY = Math.abs(this.y - playerY);

    if (disX === disY && !init) {
      return;
    }

    if (playerX >= this.x && playerY <= this.y) {
      //第一象限
      this.direction = disX > disY ? DIRECTION_ENUM.RIGHT : DIRECTION_ENUM.TOP;
    } else if (playerX <= this.x && playerY <= this.y) {
      //第二象限
      this.direction = disX > disY ? DIRECTION_ENUM.LEFT : DIRECTION_ENUM.TOP;
    } else if (playerX <= this.x && playerY >= this.y) {
      //第三象限
      this.direction = disX > disY ? DIRECTION_ENUM.LEFT : DIRECTION_ENUM.BOTTOM;
    } else if (playerX >= this.x && playerY >= this.y) {
      //第三象限
      this.direction = disX > disY ? DIRECTION_ENUM.RIGHT : DIRECTION_ENUM.BOTTOM;
    }
  }

  onDead(id: string) {
    if (this.state === ENTITY_STATE_ENUM.DEATH) {
      return;
    }

    if (this.id === id) {
      this.state = ENTITY_STATE_ENUM.DEATH;
    }
  }
}
