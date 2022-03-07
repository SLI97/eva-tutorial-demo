import { DIRECTION_ENUM, ENTITY_STATE_ENUM, EVENT_ENUM } from '../../../../../Enums';
import WoodenSkeletonStateMachine from './WoodenSkeletonStateMachine';
import EventManager from '../../../../../Runtime/EventManager';
import DataManager from '../../../../../Runtime/DataManager';
import EnemyManager from '../../../../../Base/EnemyManager';

export default class WoodenSkeletonManager extends EnemyManager {
  static componentName = 'WoodenSkeletonManager'; // 设置组件的名字

  init() {
    this.fsm = this.gameObject.addComponent(new WoodenSkeletonStateMachine());
    super.init();
    this.x = 2;
    this.y = 4;
    this.state = ENTITY_STATE_ENUM.IDLE;
    this.direction = DIRECTION_ENUM.TOP;
    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onAttack, this);
  }

  onDestroy() {
    EventManager.Instance.off(EVENT_ENUM.PLAYER_MOVE_END, this.onAttack);
  }

  onAttack() {
    if (this.state === ENTITY_STATE_ENUM.DEATH) {
      return;
    }

    const { x: playerX, y: playerY, state } = DataManager.Instance.player;

    if (
      ((this.x === playerX && Math.abs(this.y - playerY) <= 1) ||
        (this.y === playerY && Math.abs(this.x - playerX) <= 1)) &&
      state === ENTITY_STATE_ENUM.IDLE
    ) {
      this.state = ENTITY_STATE_ENUM.ATTACK;
      EventManager.Instance.emit(EVENT_ENUM.ATTACK_PLAYER, ENTITY_STATE_ENUM.DEATH);
    }
  }
}
