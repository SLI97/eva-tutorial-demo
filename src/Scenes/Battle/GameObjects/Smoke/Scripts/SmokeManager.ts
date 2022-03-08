import EntityManager from '../../../../../Base/EntityManager';
import { IEntity } from '../../../../../Levels';
import SmokeStateMachine from './SmokeStateMachine';

export default class SmokeManager extends EntityManager {
  static componentName = 'SmokeManager'; // 设置组件的名字

  init(params: IEntity) {
    this.fsm = this.gameObject.addComponent(new SmokeStateMachine());
    super.init(params);
  }
}
