import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import { DIRECTION_ENUM } from '../../../../../Enums';
import State from '../../../../../Base/State';
import DirectionSubStateMachine from '../../../../../Base/DirectionSubStateMachine';
import StateMachine from '../../../../../Base/StateMachine';

export default class IdleSubStateMachine extends DirectionSubStateMachine {
  constructor(fsm: StateMachine, spriteAnimation: SpriteAnimation) {
    super(fsm);
    this.stateMachines.set(DIRECTION_ENUM.TOP, new State(spriteAnimation, 'smoke_idle_top', 1));
    this.stateMachines.set(DIRECTION_ENUM.BOTTOM, new State(spriteAnimation, 'smoke_idle_bottom', 1));
    this.stateMachines.set(DIRECTION_ENUM.LEFT, new State(spriteAnimation, 'smoke_idle_left', 1));
    this.stateMachines.set(DIRECTION_ENUM.RIGHT, new State(spriteAnimation, 'smoke_idle_right', 1));
  }
}
