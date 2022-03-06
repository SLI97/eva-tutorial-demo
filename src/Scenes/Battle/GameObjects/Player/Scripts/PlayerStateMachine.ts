import { PARAMS_NAME_ENUM } from '../../../../../Enums';
import { ANIMATION_SPEED } from '../../../../../Base/State';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import IdleSubStateMachine from './IdleSubStateMachine';
import TurnLeftSubStateMachine from './TurnLeftSubStateMachine';
import StateMachine, { getInitParamsNumber, getInitParamsTrigger } from '../../../../../Base/StateMachine';
import TurnRightSubStateMachine from './TurnRightSubStateMachine';
import BlockFrontSubStateMachine from './BlockFrontSubStateMachine';
import BlockTurnLeftSubStateMachine from './BlockTurnLeftSubStateMachine';
import BlockBackSubStateMachine from './BlockBackSubStateMachine';
import BlockLeftSubStateMachine from './BlockLeftSubStateMachine';
import BlockRightSubStateMachine from './BlockRightSubStateMachine';
import BlockTurnRightSubStateMachine from './BlockTurnRightSubStateMachine';

export default class PlayerStateMachine extends StateMachine {
  static componentName = 'PlayerStateMachine'; // 设置组件的名字

  init() {
    this.gameObject.addComponent(
      new SpriteAnimation({
        resource: '',
        speed: ANIMATION_SPEED,
        forwards: true,
        autoPlay: false,
      }),
    );

    this.initParams();
    this.initStateMachines();
    this.initAnimationEvent();
  }

  initParams() {
    this.params.set(PARAMS_NAME_ENUM.IDLE, getInitParamsTrigger());
    this.params.set(PARAMS_NAME_ENUM.TURNLEFT, getInitParamsTrigger());
    this.params.set(PARAMS_NAME_ENUM.TURNRIGHT, getInitParamsTrigger());
    this.params.set(PARAMS_NAME_ENUM.BLOCKFRONT, getInitParamsTrigger());
    this.params.set(PARAMS_NAME_ENUM.BLOCKBACK, getInitParamsTrigger());
    this.params.set(PARAMS_NAME_ENUM.BLOCKLEFT, getInitParamsTrigger());
    this.params.set(PARAMS_NAME_ENUM.BLOCKRIGHT, getInitParamsTrigger());
    this.params.set(PARAMS_NAME_ENUM.BLOCKTURNLEFT, getInitParamsTrigger());
    this.params.set(PARAMS_NAME_ENUM.BLOCKTURNRIGHT, getInitParamsTrigger());
    this.params.set(PARAMS_NAME_ENUM.DIRECTION, getInitParamsNumber());
  }

  initStateMachines() {
    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    this.stateMachines.set(PARAMS_NAME_ENUM.IDLE, new IdleSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME_ENUM.TURNLEFT, new TurnLeftSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME_ENUM.TURNRIGHT, new TurnRightSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME_ENUM.BLOCKFRONT, new BlockFrontSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME_ENUM.BLOCKBACK, new BlockBackSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME_ENUM.BLOCKLEFT, new BlockLeftSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME_ENUM.BLOCKRIGHT, new BlockRightSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME_ENUM.BLOCKTURNLEFT, new BlockTurnLeftSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME_ENUM.BLOCKTURNRIGHT, new BlockTurnRightSubStateMachine(this, spriteAnimation));
  }

  initAnimationEvent() {
    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    spriteAnimation.on('complete', () => {
      const list = ['player_turn'];
      if (list.some(i => spriteAnimation.resource.startsWith(i))) {
        this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE);
      }
    });
  }

  run() {
    switch (this.currentState) {
      case this.stateMachines.get(PARAMS_NAME_ENUM.IDLE):
      case this.stateMachines.get(PARAMS_NAME_ENUM.TURNLEFT):
        if (this.params.get(PARAMS_NAME_ENUM.TURNLEFT).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.TURNLEFT);
        } else if (this.params.get(PARAMS_NAME_ENUM.TURNRIGHT).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.TURNRIGHT);
        } else if (this.params.get(PARAMS_NAME_ENUM.BLOCKFRONT).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.BLOCKFRONT);
        } else if (this.params.get(PARAMS_NAME_ENUM.BLOCKBACK).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.BLOCKBACK);
        } else if (this.params.get(PARAMS_NAME_ENUM.BLOCKLEFT).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.BLOCKLEFT);
        } else if (this.params.get(PARAMS_NAME_ENUM.BLOCKRIGHT).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.BLOCKRIGHT);
        } else if (this.params.get(PARAMS_NAME_ENUM.BLOCKTURNLEFT).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.BLOCKTURNLEFT);
        } else if (this.params.get(PARAMS_NAME_ENUM.BLOCKTURNRIGHT).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.BLOCKTURNRIGHT);
        } else if (this.params.get(PARAMS_NAME_ENUM.IDLE).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE);
        } else {
          this.currentState = this.currentState;
        }
        break;
      default:
        this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE);
        break;
    }
  }
}
