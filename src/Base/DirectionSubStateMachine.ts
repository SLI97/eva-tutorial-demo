import SubStateMachine from './SubStateMachine';
import { DIRECTION_ORDER_ENUM, PARAMS_NAME_ENUM } from '../Enums';

export default class DirectionSubStateMachine extends SubStateMachine {
  run() {
    const { value: newDirection } = this.fsm.params.get(PARAMS_NAME_ENUM.DIRECTION);
    this.currentState = this.stateMachines.get(DIRECTION_ORDER_ENUM[newDirection as number]);
  }
}
