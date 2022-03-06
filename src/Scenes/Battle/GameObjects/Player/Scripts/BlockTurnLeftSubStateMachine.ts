import PlayerStateMachine from './PlayerStateMachine';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import { DIRECTION_ENUM } from '../../../../../Enums';
import State from '../../../../../Base/State';
import DirectionSubStateMachine from '../../../../../Base/DirectionSubStateMachine';

export default class BlockTurnLeftSubStateMachine extends DirectionSubStateMachine {
  constructor(fsm: PlayerStateMachine, spriteAnimation: SpriteAnimation) {
    super(fsm);
    this.stateMachines.set(DIRECTION_ENUM.TOP, new State(spriteAnimation, 'player_block_turn_left_top', 1));
    this.stateMachines.set(DIRECTION_ENUM.BOTTOM, new State(spriteAnimation, 'player_block_turn_left_bottom', 1));
    this.stateMachines.set(DIRECTION_ENUM.LEFT, new State(spriteAnimation, 'player_block_turn_left_left', 1));
    this.stateMachines.set(DIRECTION_ENUM.RIGHT, new State(spriteAnimation, 'player_block_turn_left_right', 1));
  }
}