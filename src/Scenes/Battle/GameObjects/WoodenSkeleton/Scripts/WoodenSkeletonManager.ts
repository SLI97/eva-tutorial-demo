import { DIRECTION_ENUM, ENTITY_STATE_ENUM } from '../../../../../Enums';
import EntityManager from '../../../../../Base/EntityManager';
import WoodenSkeletonStateMachine from './WoodenSkeletonStateMachine';

export default class WoodenSkeletonManager extends EntityManager {
  static componentName = 'WoodenSkeletonManager'; // 设置组件的名字

  init() {
    this.fsm = this.gameObject.addComponent(new WoodenSkeletonStateMachine());
    this.x = 7;
    this.y = 6;
    this.state = ENTITY_STATE_ENUM.IDLE;
    this.direction = DIRECTION_ENUM.TOP;
  }
}
