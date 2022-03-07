import { DIRECTION_ENUM, ENTITY_STATE_ENUM } from '../../../../../Enums';
import EnemyManager from '../../../../../Base/EnemyManager';
import IronSkeletonStateMachine from './IronSkeletonStateMachine';

export default class IronSkeletonManager extends EnemyManager {
  static componentName = 'IronSkeletonManager'; // 设置组件的名字

  init() {
    this.fsm = this.gameObject.addComponent(new IronSkeletonStateMachine());
    super.init();
    this.x = 1;
    this.y = 5;
    this.state = ENTITY_STATE_ENUM.IDLE;
    this.direction = DIRECTION_ENUM.TOP;
  }
}
